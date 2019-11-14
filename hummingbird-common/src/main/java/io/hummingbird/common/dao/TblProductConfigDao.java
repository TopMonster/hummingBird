package io.hummingbird.common.dao;


import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import io.hummingbird.common.entity.TblProductConfigEntity;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * 产品配置
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-03-06 20:59:36
 */
@Mapper
public interface TblProductConfigDao extends BaseMapper<TblProductConfigEntity> {
    /**
     * Andam  产品按order_num 和 total_product_click排序 以达到均衡同order_num的total_product_click Dao
     */

    List<TblProductConfigEntity> listTblProductConfigEntity(String shelfCode);
	
}
