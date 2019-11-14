/**
 * Copyright (c) 2016-2019 蜂鸟开源 All rights reserved.
 *
 * https://www.hummingbird.io
 *
 * 版权所有，侵权必究！
 */

package io.hummingbird.entity;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * 登录请求返回数据
 *
 * @author Top
 */
@Data
@ApiModel(value = "登录请求返回")
public class LoginResponse {
	@ApiModelProperty(value = "手机号")
	private String mobile;

	@ApiModelProperty(value = "用户id")
	private String userId;

	@ApiModelProperty(value = "token")
	private String token;

}
