
package io.hummingbird.common.core.dao;


import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import io.hummingbird.common.core.entity.SysLogEntity;

import org.apache.ibatis.annotations.Mapper;

/**
 * 系统日志
 *
 * @author Top
 */
@Mapper
public interface SysLogDao extends BaseMapper<SysLogEntity> {
	
}
