/**
 * Copyright (c) 2016-2019 蜂鸟开源 All rights reserved.
 *
 * https://www.hummingbird.io
 *
 * 版权所有，侵权必究！
 */

package io.hummingbird.modules.sys.service;


import com.baomidou.mybatisplus.extension.service.IService;

import io.hummingbird.common.entity.SysLogEntity;
import io.hummingbird.common.utils.PageUtils;

import java.util.Map;


/**
 * 系统日志
 *
 * @author Top
 */
public interface SysLogService extends IService<SysLogEntity> {

    PageUtils queryPage(Map<String, Object> params);

}
