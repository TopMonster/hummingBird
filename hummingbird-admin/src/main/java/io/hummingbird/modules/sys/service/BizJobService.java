package io.hummingbird.modules.sys.service;

import java.util.Map;

import com.baomidou.mybatisplus.extension.service.IService;

import io.hummingbird.common.core.entity.BizJobEntity;
import io.hummingbird.common.utils.PageUtils;

/**
 * 
 *
 * @author Top
 * @email xxx@gmail.com
 * @date 2020-09-16 09:26:51
 */
public interface BizJobService extends IService<BizJobEntity> {

	PageUtils queryPage(Map<String, Object> params);
}
