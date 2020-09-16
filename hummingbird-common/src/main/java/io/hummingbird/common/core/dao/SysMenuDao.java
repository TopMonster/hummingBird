
package io.hummingbird.common.core.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import io.hummingbird.common.core.entity.SysMenuEntity;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * 菜单管理
 *
 * @author Top
 */
@Mapper
public interface SysMenuDao extends BaseMapper<SysMenuEntity> {
	
	/**
	 * 根据父菜单，查询子菜单
	 * @param parentId 父菜单ID
	 */
	List<SysMenuEntity> queryListParentId(Long parentId);
	
	/**
	 * 获取不包含按钮的菜单列表
	 */
	List<SysMenuEntity> queryNotButtonList();

	/**
	 * Andam 获取ChannelMenu Dao
	 * @param channelMenu
	 * @return
	 */
	SysMenuEntity getChannelMenu(SysMenuEntity channelMenu);

}
