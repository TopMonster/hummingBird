/**
 * Copyright (c) 2016-2019 蜂鸟开源 All rights reserved.
 *
 * https://www.hummingbird.io
 *
 * 版权所有，侵权必究！
 */

package io.hummingbird.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.hummingbird.annotation.Login;
import io.hummingbird.common.utils.R;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

/**
 * token接口
 *
 * @author top
 */
@RestController
@RequestMapping("/api/token")
@Api(tags = "Token接口")
public class TokenController {
	@GetMapping("verify")
	@ApiOperation("校验token有效")
	@Login
	public R verify() {
		return R.ok();
	}

}
