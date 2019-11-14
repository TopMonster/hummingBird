/**
 * Copyright (c) 2016-2019 蜂鸟开源 All rights reserved.
 *
 * https://www.hummingbird.io
 *
 * 版权所有，侵权必究！
 */

package io.hummingbird.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import io.hummingbird.entity.TokenEntity;

import org.apache.ibatis.annotations.Mapper;

/**
 * 用户Token
 *
 * @author Top
 */
@Mapper
public interface TokenDao extends BaseMapper<TokenEntity> {
	
}
