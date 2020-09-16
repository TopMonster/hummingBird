 

package io.hummingbird.common.service;

import com.baomidou.mybatisplus.extension.service.IService;

import io.hummingbird.common.core.entity.SysDictEntity;
import io.hummingbird.common.utils.PageUtils;

import java.util.List;
import java.util.Map;

/**
 * 数据字典
 *
 * @author Top
 */
public interface SysDictService extends IService<SysDictEntity> {

    PageUtils queryPage(Map<String, Object> params);

    List<String> listByType(String type);
    
    List<SysDictEntity> listEntityByType(String type);
}

