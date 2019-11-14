/**
 * Copyright (c) 2016-2019 蜂鸟开源 All rights reserved.
 *
 * https://www.hummingbird.io
 *
 * 版权所有，侵权必究！
 */

package io.hummingbird.modules.sys.service;


import com.baomidou.mybatisplus.extension.service.IService;

import io.hummingbird.common.entity.SysRoleEntity;
import io.hummingbird.common.utils.PageUtils;

import java.util.Map;


/**
 * 角色
 *
 * @author Top
 */
public interface SysRoleService extends IService<SysRoleEntity> {

	PageUtils queryPage(Map<String, Object> params);

	void saveRole(SysRoleEntity role);

	void update(SysRoleEntity role);
	
	void deleteBatch(Long[] roleIds);

}
