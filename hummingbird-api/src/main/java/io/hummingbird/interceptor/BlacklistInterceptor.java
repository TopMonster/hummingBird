
package io.hummingbird.interceptor;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import io.hummingbird.annotation.BlackForbiden;
import io.hummingbird.common.core.entity.SysDictEntity;
import io.hummingbird.common.core.enums.ErrorCodeEnum;
import io.hummingbird.common.exception.RRException;
import io.hummingbird.common.service.SysDictService;
import io.hummingbird.common.utils.IPUtils;
import io.hummingbird.common.utils.RedisUtils;

@Component
public class BlacklistInterceptor extends HandlerInterceptorAdapter {
	@Autowired
	private SysDictService sysDictService;
	@Autowired
	private RedisUtils redisUtils;
	/** 默认过期时长，单位：秒 */
	public final static long EXPIRE_SECONDS = 5;
	private Logger logger = LoggerFactory.getLogger(getClass());

	public static final String DICT_BLACKIPS_KEY = "blackIpList";
	public static final String DICT_BLACKIPS_MAX_VISITTIMES_KEY = "ipVisitMaxTimes";
	

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		String ip = IPUtils.getIpAddr(request);
		if(isCurIpInBlackList(ip)){
			logger.info(" ip 为:{} 命中ip黑名单 禁止访问",ip);
			throw new RRException("暂时不能访问", ErrorCodeEnum.BIZ.code);
		}
		BlackForbiden annotation;
		if (handler instanceof HandlerMethod) {
			annotation = ((HandlerMethod) handler).getMethodAnnotation(BlackForbiden.class);
		} else {
			return true;
		}

		if (annotation == null) {
			return true;
		}
		//如果T时间段内ip出现N次需要加入到黑名单中进行限制
		HandlerMethod hm = (HandlerMethod) handler;
		String methodName=hm.getMethod().getDeclaringClass().getSimpleName();
		blackIpMonitor(ip, methodName);
		return true;
	}
	
	private String buildRedisKey(String ip, String invokeName) {
		return "blackIpList:" + ip + ":" + invokeName;
	}
	
	private void blackIpMonitor(String ip,String methodName){
		String redisKey=buildRedisKey(ip, methodName);
		Integer visitedTimes=redisUtils.increment(redisKey, EXPIRE_SECONDS);
		Integer maxTimes=getIpVisitMaxTimes();
		if(null!=maxTimes&&visitedTimes.intValue()>=maxTimes){
			SysDictEntity blckIpListEntity=getConfigedBlackListEntity();
			if(null!=blckIpListEntity){
				String blackListStr=blckIpListEntity.getValue();
				if(!StringUtils.isEmpty(blackListStr)&&blackListStr.contains(ip)){
					return;
				}
				if(StringUtils.isEmpty(blackListStr)){
					blackListStr=ip;
				}
				String[] temp=blackListStr.split(",");
				if(temp.length>50){
					blackListStr="";
				}
				blackListStr=blackListStr+","+ip;
				blckIpListEntity.setValue(blackListStr);
				sysDictService.updateById(blckIpListEntity);
			}
		}
	}
	
	 
	
	private String getConfigedBlackIps(){
		List<String> ipList = sysDictService.listByType(DICT_BLACKIPS_KEY);
		if(!org.springframework.util.CollectionUtils.isEmpty(ipList)){
			return ipList.get(0);
		}
		return "";
	}
	
	private Integer getIpVisitMaxTimes(){
		List<String> ipList = sysDictService.listByType(DICT_BLACKIPS_MAX_VISITTIMES_KEY);
		if(!org.springframework.util.CollectionUtils.isEmpty(ipList)){
			return Integer.parseInt(ipList.get(0));
		}
		return null;
	}
	
	private boolean isCurIpInBlackList(String ip){
		String blackIps=getConfigedBlackIps();
		return blackIps.contains(ip);
	}
	
	private SysDictEntity getConfigedBlackListEntity(){
		 List<SysDictEntity> list=sysDictService.listEntityByType(DICT_BLACKIPS_KEY);
		 if(!org.springframework.util.CollectionUtils.isEmpty(list)){
				return list.get(0);
			}
			return null;
	}
}
