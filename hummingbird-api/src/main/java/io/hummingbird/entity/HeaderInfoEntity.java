/**
 * Copyright (c) 2016-2019 蜂鸟开源 All rights reserved.
 *
 * https://www.hummingbird.io
 *
 * 版权所有，侵权必究！
 */

package io.hummingbird.entity;

import io.swagger.annotations.ApiModel;
import lombok.Data;
import lombok.ToString;

/**
 * 设备信息
 *
 * @author
 */
@Data
@ToString
@ApiModel(value = "设备信息")
public class HeaderInfoEntity {
	private String os;

	private String deviceId;

	private String userAgent;

	private String ip;

}
