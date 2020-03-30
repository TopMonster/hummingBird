package io.hummingbird.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import io.hummingbird.annotation.Login;
import io.hummingbird.common.exception.RRException;
import io.hummingbird.util.JwtUtils;
import io.jsonwebtoken.Claims;

/**
 * 权限(Token)验证
 *
 * @author Mark sunlightcs@gmail.com
 */
@Component
public class AuthorizationInterceptor extends HandlerInterceptorAdapter {
	@Autowired
	private JwtUtils jwtUtils;

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

		// 获取用户凭证
		String token = request.getHeader(jwtUtils.getHeader());
		if (StringUtils.isBlank(token)) {
			token = request.getParameter(jwtUtils.getHeader());
		}

		// 凭证为空
		if (StringUtils.isBlank(token)) {
			throw new RRException(jwtUtils.getHeader() + "不能为空", HttpStatus.UNAUTHORIZED.value());
		}

		Claims claims = jwtUtils.getClaimByToken(token);
		if (claims == null || jwtUtils.isTokenExpired(claims.getExpiration())) {
			throw new RRException(jwtUtils.getHeader() + "失效，请重新登录", HttpStatus.UNAUTHORIZED.value());
		}

		// 设置userId到request里，后续根据userId，获取用户信息
		request.setAttribute(USER_KEY, Long.parseLong(claims.getSubject()));

		return true;
	}
}
