package io.hummingbird.resolver;

import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import io.hummingbird.annotation.LoginUser;
import io.hummingbird.entity.UserEntity;
import io.hummingbird.interceptor.AuthorizationInterceptor;

/**
 * 有@LoginUser注解的方法参数，注入当前登录用户
 *
 * @author Top
 */
@Component
public class LoginUserHandlerMethodArgumentResolver implements HandlerMethodArgumentResolver {
	 

	@Override
	public boolean supportsParameter(MethodParameter parameter) {
		return parameter.getParameterType().isAssignableFrom(UserEntity.class)
				&& parameter.hasParameterAnnotation(LoginUser.class);
	}

	@Override
	public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer container, NativeWebRequest request,
			WebDataBinderFactory factory) throws Exception {
		// 获取用户ID
		Object object = request.getAttribute(AuthorizationInterceptor.USER_KEY, RequestAttributes.SCOPE_REQUEST);
		if (object == null) {
			return null;
		}
		// 获取用户信息
		//TblRegisterUserEntity user = registerUserService.queryByUserId((String) object);
		return null;
	}
}
