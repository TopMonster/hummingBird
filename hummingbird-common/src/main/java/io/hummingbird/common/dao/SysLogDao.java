
package io.hummingbird.common.dao;


import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import io.hummingbird.common.entity.SysLogEntity;

import org.apache.ibatis.annotations.Mapper;

/**
 * 系统日志
 *
 * @author Top
 */
@Mapper
public interface SysLogDao extends BaseMapper<SysLogEntity> {
	
}
