/**
 * Copyright (c) 2016-2019 蜂鸟开源 All rights reserved.
 *
 * https://www.hummingbird.io
 *
 * 版权所有，侵权必究！
 */

package io.hummingbird.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.hummingbird.annotation.Login;
import io.hummingbird.form.LoginForm;
import io.hummingbird.service.TokenService;
import io.hummingbird.service.UserService;
import io.hummingbird.common.utils.R;
import io.hummingbird.common.validator.ValidatorUtils;
import springfox.documentation.annotations.ApiIgnore;

/**
 * 登录接口
 *
 * @author Top
 */
@RestController
@RequestMapping("/api")
// @Api(tags = "登录接口")
public class ApiLoginController {
	@Autowired
	private UserService userService;
	@Autowired
	private TokenService tokenService;

	@PostMapping("login")
	// @ApiOperation("登录")
	public R login(@RequestBody LoginForm form) {
		// 表单校验
		ValidatorUtils.validateEntity(form);

		// 用户登录
		Map<String, Object> map = userService.login(form);

		return R.ok(map);
	}

	@Login
	@PostMapping("logout")
	// @ApiOperation("退出")
	public R logout(@ApiIgnore @RequestAttribute("userId") String userId) {
		tokenService.expireToken(userId);
		return R.ok();
	}

}
