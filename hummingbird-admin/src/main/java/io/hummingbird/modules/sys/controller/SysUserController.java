/**
 * Copyright (c) 2016-2019 蜂鸟开源 All rights reserved.
 *
 * https://www.hummingbird.io
 *
 * 版权所有，侵权必究！
 */

package io.hummingbird.modules.sys.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.ArrayUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;

import io.hummingbird.common.annotation.SysLog;
import io.hummingbird.common.core.entity.SysRoleEntity;
import io.hummingbird.common.core.entity.SysUserEntity;
import io.hummingbird.common.core.entity.SysUserRoleEntity;
import io.hummingbird.common.utils.PageUtils;
import io.hummingbird.common.utils.R;
import io.hummingbird.common.validator.Assert;
import io.hummingbird.common.validator.ValidatorUtils;
import io.hummingbird.common.validator.group.AddGroup;
import io.hummingbird.common.validator.group.UpdateGroup;
import io.hummingbird.modules.sys.service.SysDeptService;
import io.hummingbird.modules.sys.service.SysRoleService;
import io.hummingbird.modules.sys.service.SysUserRoleService;
import io.hummingbird.modules.sys.service.SysUserService;
import io.hummingbird.modules.sys.shiro.ShiroUtils;

/**
 * 系统用户
 *
 * @author Top
 */
@RestController
@RequestMapping("/sys/user")
public class SysUserController extends AbstractController {
	@Autowired
	private SysUserService sysUserService;
	@Autowired
	private SysUserRoleService sysUserRoleService;

	@Autowired
	private SysRoleService sysRoleService;
	@Autowired
	private SysDeptService sysDeptService;

	/**
	 * 所有用户列表
	 */
	@RequestMapping("/list")
	@RequiresPermissions("sys:user:list")
	public R list(@RequestParam Map<String, Object> params) {
		PageUtils page = sysUserService.queryPage(params);

		return R.ok().put("page", page);
	}

	/**
	 * 所有用户列表
	 */
	@RequestMapping("/list-business")
	// @RequiresPermissions("sys:user:list:business")
	public R listBuiness() {
		String roleName = "商务方";
		SysRoleEntity sysRoleEntity = sysRoleService
				.getOne(new QueryWrapper<SysRoleEntity>().eq("role_name", roleName));
		if (sysRoleEntity == null) {
			return R.error("商务方不存在");
		}
		List<SysUserRoleEntity> userRoleList = sysUserRoleService
				.list(new QueryWrapper<SysUserRoleEntity>().eq("role_id", sysRoleEntity.getRoleId()));
		if (CollectionUtils.isEmpty(userRoleList)) {
			return R.ok();
		}
		List<Long> userIds = new ArrayList<>(userRoleList.size());
		for (SysUserRoleEntity sysUserRoleEntity : userRoleList) {
			userIds.add(sysUserRoleEntity.getUserId());
		}
		List<SysUserEntity> list = sysUserService.list(new QueryWrapper<SysUserEntity>().in("user_id", userIds));
		return R.ok(list);
	}

	/**
	 * 获取登录的用户信息
	 */
	@RequestMapping("/info")
	public R info() {
		return R.ok().put("user", getUser());
	}

	/**
	 * 修改登录用户密码
	 */
	@SysLog("修改密码")
	@RequestMapping("/password")
	public R password(String password, String newPassword) {
		Assert.isBlank(newPassword, "新密码不为能空");

		// 原密码
		password = ShiroUtils.sha256(password, getUser().getSalt());
		// 新密码
		newPassword = ShiroUtils.sha256(newPassword, getUser().getSalt());

		// 更新密码
		boolean flag = sysUserService.updatePassword(getUserId(), password, newPassword);
		if (!flag) {
			return R.error("原密码不正确");
		}

		return R.ok();
	}

	/**
	 * 用户信息
	 */
	@RequestMapping("/info/{userId}")
	@RequiresPermissions("sys:user:info")
	public R info(@PathVariable("userId") Long userId) {
		SysUserEntity user = sysUserService.getById(userId);

		// 获取用户所属的角色列表
		List<Long> roleIdList = sysUserRoleService.queryRoleIdList(userId);
		user.setRoleIdList(roleIdList);

		return R.ok().put("user", user);
	}

	/**
	 * 保存用户
	 */
	@SysLog("保存用户")
	@RequestMapping("/save")
	@RequiresPermissions("sys:user:save")
	public R save(@RequestBody SysUserEntity user) {
		ValidatorUtils.validateEntity(user, AddGroup.class);

		sysUserService.saveUser(user);

		return R.ok();
	}

	/**
	 * 修改用户
	 */
	@SysLog("修改用户")
	@RequestMapping("/update")
	@RequiresPermissions("sys:user:update")
	public R update(@RequestBody SysUserEntity user) {
		ValidatorUtils.validateEntity(user, UpdateGroup.class);

		sysUserService.update(user);

		return R.ok();
	}

	/**
	 * 删除用户
	 */
	@SysLog("删除用户")
	@RequestMapping("/delete")
	@RequiresPermissions("sys:user:delete")
	public R delete(@RequestBody Long[] userIds) {
		if (ArrayUtils.contains(userIds, 1L)) {
			return R.error("系统管理员不能删除");
		}

		if (ArrayUtils.contains(userIds, getUserId())) {
			return R.error("当前用户不能删除");
		}

		sysUserService.removeByIds(Arrays.asList(userIds));

		return R.ok();
	}
}
