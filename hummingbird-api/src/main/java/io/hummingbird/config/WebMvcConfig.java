/**
 * Copyright (c) 2016-2019 蜂鸟开源 All rights reserved.
 *
 * https://www.hummingbird.io
 *
 * 版权所有，侵权必究！
 */

package io.hummingbird.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import io.hummingbird.interceptor.AuthorizationInterceptor;
import io.hummingbird.interceptor.BlacklistInterceptor;
import io.hummingbird.resolver.HeaderInfoHandlerMethodArgumentResolver;
import io.hummingbird.resolver.LoginUserHandlerMethodArgumentResolver;

/**
 * MVC配置
 *
 * @author Top
 */
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
	@Autowired
	private AuthorizationInterceptor authorizationInterceptor;
	@Autowired
	private BlacklistInterceptor blacklistInterceptor;
	@Autowired
	private LoginUserHandlerMethodArgumentResolver loginUserHandlerMethodArgumentResolver;

	@Autowired
	private HeaderInfoHandlerMethodArgumentResolver headerInfoHandlerMethodArgumentResolver;

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(authorizationInterceptor).addPathPatterns("/api/**");
		registry.addInterceptor(blacklistInterceptor).addPathPatterns("/api/**");
	}

	@Override
	public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
		argumentResolvers.add(loginUserHandlerMethodArgumentResolver);
		argumentResolvers.add(headerInfoHandlerMethodArgumentResolver);
	}
}