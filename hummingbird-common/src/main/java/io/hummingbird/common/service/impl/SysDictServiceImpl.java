
package io.hummingbird.common.service.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import io.hummingbird.common.core.dao.SysDictDao;
import io.hummingbird.common.core.entity.SysDictEntity;
import io.hummingbird.common.service.SysDictService;
import io.hummingbird.common.utils.PageUtils;
import io.hummingbird.common.utils.Query;

@Service("sysDictService")
public class SysDictServiceImpl extends ServiceImpl<SysDictDao, SysDictEntity> implements SysDictService {

	@Override
	public PageUtils queryPage(Map<String, Object> params) {
		String name = (String) params.get("name");

		IPage<SysDictEntity> page = this.page(new Query<SysDictEntity>().getPage(params),
				new QueryWrapper<SysDictEntity>().like(StringUtils.isNotBlank(name), "name", name));

		return new PageUtils(page);
	}

	@Override
	public List<String> listByType(String type) {
		List<SysDictEntity> list = this.list(new QueryWrapper<SysDictEntity>().eq("type", type));
		if (CollectionUtils.isEmpty(list)) {
			return Collections.emptyList();
		}
		List<String> returnList = new ArrayList<>(list.size());
		for (SysDictEntity sysDictEntity : list) {
			returnList.add(sysDictEntity.getValue());
		}
		return returnList;
	}

	@Override
	public List<SysDictEntity> listEntityByType(String type) {
		List<SysDictEntity> list = this.list(new QueryWrapper<SysDictEntity>().eq("type", type));
		if (CollectionUtils.isEmpty(list)) {
			return Collections.emptyList();
		}
		return list;
	}

}
