/**
 * Copyright (c) 2016-2019 蜂鸟开源 All rights reserved.
 *
 * https://www.hummingbird.io
 *
 * 版权所有，侵权必究！
 */

package io.hummingbird.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import io.hummingbird.entity.UserEntity;

import org.apache.ibatis.annotations.Mapper;

/**
 * 用户
 *
 * @author Top
 */
@Mapper
public interface UserDao extends BaseMapper<UserEntity> {

}
