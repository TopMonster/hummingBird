
package io.hummingbird.service;

import com.baomidou.mybatisplus.extension.service.IService;

import io.hummingbird.entity.UserEntity;
import io.hummingbird.form.LoginForm;

/**
 * 用户
 *
 * @author Top
 */
public interface UserService extends IService<UserEntity> {

	UserEntity queryByMobile(String mobile);

	/**
	 * 用户登录
	 * 
	 * @param form
	 *            登录表单
	 * @return 返回登录信息
	 */
	String login(LoginForm form);
}
