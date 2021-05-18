package io.hummingbird.resolver;

import javax.servlet.http.HttpServletRequest;

import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import com.alibaba.fastjson.JSON;

import io.hummingbird.annotation.HeaderInfo;
import io.hummingbird.common.utils.IPUtils;
import io.hummingbird.entity.DeviceInfoEntity;

/**
 * 有@DeviceInfo注解的方法参数，注入当前设备信息
 *
 * @author Top
 */
@Component
public class HeaderInfoHandlerMethodArgumentResolver implements HandlerMethodArgumentResolver {

	@Override
	public boolean supportsParameter(MethodParameter parameter) {
		return parameter.getParameterType().isAssignableFrom(DeviceInfoEntity.class)
				&& parameter.hasParameterAnnotation(HeaderInfo.class);
	}

	@Override
	public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer container, NativeWebRequest request,
			WebDataBinderFactory factory) throws Exception {
		String deviceInfoStr = request.getHeader("DeviceInfo");
		DeviceInfoEntity headerInfoEntity = JSON.parseObject(deviceInfoStr, DeviceInfoEntity.class);
		if (headerInfoEntity == null) {
			headerInfoEntity = new DeviceInfoEntity();
		}
		String userAgent = request.getHeader("User-Agent");
		headerInfoEntity.setUserAgent(userAgent);

		HttpServletRequest httpRequest = request.getNativeRequest(HttpServletRequest.class);
		String ip = IPUtils.getIpAddr(httpRequest);
		headerInfoEntity.setIp(ip);
		return headerInfoEntity;
	}
}
