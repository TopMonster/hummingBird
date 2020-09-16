package io.hummingbird.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.hummingbird.common.utils.PageUtils;
import io.hummingbird.common.core.entity.BizJobEntity;

import java.util.Map;

/**
 * 
 *
 * @author Top
 * @email xxx@gmail.com
 * @date 2020-09-16 10:30:04
 */
public interface BizJobService extends IService<BizJobEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

