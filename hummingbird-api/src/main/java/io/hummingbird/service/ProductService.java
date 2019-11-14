package io.hummingbird.service;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.extension.service.IService;

import io.hummingbird.common.entity.TblProductConfigEntity;

public interface ProductService extends IService<TblProductConfigEntity>{

    /**
     * 通过产品编码查询数据
     * @param productCode
     * @return
     */
    TblProductConfigEntity listByCode(String productCode);

    /**
     * 通过货架位编码查询产品
     * @param shelfCodes
     * @return
     */
    JSONObject listByShelfCode(String shelfCodes,String osType);


}
