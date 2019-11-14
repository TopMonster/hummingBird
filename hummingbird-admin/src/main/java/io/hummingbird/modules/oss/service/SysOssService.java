/**
 * Copyright (c) 2016-2019 蜂鸟开源 All rights reserved.
 *
 * https://www.hummingbird.io
 *
 * 版权所有，侵权必究！
 */

package io.hummingbird.modules.oss.service;

import com.baomidou.mybatisplus.extension.service.IService;

import io.hummingbird.common.utils.PageUtils;
import io.hummingbird.modules.oss.entity.SysOssEntity;

import java.util.Map;

/**
 * 文件上传
 *
 * @author Top
 */
public interface SysOssService extends IService<SysOssEntity> {

	PageUtils queryPage(Map<String, Object> params);
}
