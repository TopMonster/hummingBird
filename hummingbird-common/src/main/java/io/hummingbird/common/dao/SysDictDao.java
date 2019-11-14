 
package io.hummingbird.common.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import io.hummingbird.common.entity.SysDictEntity;

import org.apache.ibatis.annotations.Mapper;

/**
 * 数据字典
 *
 * @author Top
 */
@Mapper
public interface SysDictDao extends BaseMapper<SysDictEntity> {
	
}
