/**
 * Copyright (c) 2016-2019 蜂鸟开源 All rights reserved.
 *
 * https://www.hummingbird.io
 *
 * 版权所有，侵权必究！
 */

package io.hummingbird.entity;

import javax.validation.constraints.NotBlank;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * 登录表单
 *
 * @author Top
 */
@Data
@ApiModel(value = "登录请求")
public class LoginRequest {
	@ApiModelProperty(value = "手机号")
	@NotBlank(message = "手机号不能为空")
	private String mobile;

	@ApiModelProperty(value = "密码")
	@NotBlank(message = "密码不能为空")
	private String password;

}
