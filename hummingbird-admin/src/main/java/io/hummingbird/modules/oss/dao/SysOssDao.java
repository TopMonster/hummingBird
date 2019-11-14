/**
 * Copyright (c) 2016-2019 蜂鸟开源 All rights reserved.
 *
 * https://www.hummingbird.io
 *
 * 版权所有，侵权必究！
 */

package io.hummingbird.modules.oss.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import io.hummingbird.modules.oss.entity.SysOssEntity;

import org.apache.ibatis.annotations.Mapper;

/**
 * 文件上传
 *
 * @author Top
 */
@Mapper
public interface SysOssDao extends BaseMapper<SysOssEntity> {
	
}
