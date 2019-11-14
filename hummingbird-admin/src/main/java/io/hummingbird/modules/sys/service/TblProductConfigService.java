package io.hummingbird.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;

import io.hummingbird.common.entity.TblProductConfigEntity;
import io.hummingbird.common.utils.PageUtils;

import java.util.List;
import java.util.Map;

/**
 * 产品配置
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-03-06 20:59:36
 */
public interface TblProductConfigService extends IService<TblProductConfigEntity> {

    PageUtils queryPage(Map<String, Object> params);


    TblProductConfigEntity queryByProductCode(String productCode);

    /**
     * 查询所有产品
     * @return
     */
    List<TblProductConfigEntity> listAll();


}

