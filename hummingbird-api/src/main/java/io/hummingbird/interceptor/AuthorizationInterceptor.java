/**
 * Copyright (c) 2016-2019 蜂鸟开源 All rights reserved.
 *
 * https://www.hummingbird.io
 *
 * 版权所有，侵权必究！
 */

package io.hummingbird.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import io.hummingbird.annotation.Login;
import io.hummingbird.entity.TokenEntity;
import io.hummingbird.service.TokenService;
import io.hummingbird.common.enums.ErrorCodeEnum;
import io.hummingbird.common.exception.RRException;

/**
 * 权限(Token)验证
 *
 * @author top
 */
@Component
public class AuthorizationInterceptor extends HandlerInterceptorAdapter {
	@Autowired
	private TokenService tokenService;
	private Logger logger = LoggerFactory.getLogger(getClass());

	public static final String USER_KEY = "userId";

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		Login annotation;
		if (handler instanceof HandlerMethod) {
			annotation = ((HandlerMethod) handler).getMethodAnnotation(Login.class);
		} else {
			return true;
		}

		if (annotation == null) {
			return true;
		}

		// 从header中获取token
		String token = request.getHeader("token");
		// 如果header中不存在token，则从参数中获取token
		if (StringUtils.isBlank(token)) {
			token = request.getParameter("token");
		}
		String userId = request.getHeader("userId");
		// 如果header中不存在userId，则从参数中获取userId
		if (StringUtils.isBlank(userId)) {
			userId = request.getParameter("userId");
		}

		// token为空
		if (StringUtils.isBlank(token)) {
			logger.info(" [token验证],从header和requestUrl中均无token请求参数,返回登录界面");
			throw new RRException("token不能为空", ErrorCodeEnum.BIZ.code);
		}

		// userId为空
		if (StringUtils.isBlank(userId)) {
			logger.info(" [token验证],从header和requestUrl中均无userId请求参数,返回登录界面");
			throw new RRException("userId不能为空", ErrorCodeEnum.BIZ.code);
		}

		// 查询token信息
		TokenEntity tokenEntity = tokenService.queryByToken(token);
		if(null==tokenEntity){
			 tokenEntity = tokenService.queryByUserId(userId);
		}
		if (tokenEntity == null || tokenEntity.getExpireTime().getTime() < System.currentTimeMillis()) {
			logger.info(" [token验证],从数据库查询token已经失效,返回登录界面,token:{},userId:{}",token,userId);
			throw new RRException(ErrorCodeEnum.TOKEN_EXPIRE.message, ErrorCodeEnum.TOKEN_EXPIRE.code);
		}

		// 设置userId到request里，后续根据userId，获取用户信息
		request.setAttribute(USER_KEY, tokenEntity.getUserId());
		return true;
	}
}
