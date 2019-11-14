 
package io.hummingbird.common.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import io.hummingbird.common.entity.SysUserEntity;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * 系统用户
 *
 * @author Top
 */
@Mapper
public interface SysUserDao extends BaseMapper<SysUserEntity> {
	
	/**
	 * 查询用户的所有权限
	 * @param userId  用户ID
	 */
	List<String> queryAllPerms(Long userId);
	
	/**
	 * 查询用户的所有菜单ID
	 */
	List<Long> queryAllMenuId(Long userId);

	/**
	 * Andam 修改渠道同时可以修改账号用户名和密码
	 * @param sysUserEntity
	 * @return
	 */
	int updateNamePassword(SysUserEntity sysUserEntity);

}
