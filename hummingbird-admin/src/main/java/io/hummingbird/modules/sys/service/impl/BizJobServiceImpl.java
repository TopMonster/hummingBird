package io.hummingbird.modules.sys.service.impl;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import io.hummingbird.common.core.dao.BizJobDao;
import io.hummingbird.common.core.entity.BizJobEntity;
import io.hummingbird.common.utils.Constant;
import io.hummingbird.common.utils.PageUtils;
import io.hummingbird.common.utils.Query;
import io.hummingbird.modules.sys.service.BizJobService;

@Service("bizJobService")
public class BizJobServiceImpl extends ServiceImpl<BizJobDao, BizJobEntity> implements BizJobService {

	@Override
	public PageUtils queryPage(Map<String, Object> params) {
		QueryWrapper<BizJobEntity> warpper = new QueryWrapper<BizJobEntity>();
		String id = (String) params.get("id");
		if (!StringUtils.isEmpty(id)) {
			warpper.likeRight("id ", id);
		}
		String name = (String) params.get("name");
		if (!StringUtils.isEmpty(name)) {
			warpper.likeRight("name ", name);
		}
		String city = (String) params.get("city");
		if (!StringUtils.isEmpty(city)) {
			warpper.likeRight("city ", city);
		}
		String type = (String) params.get("type");
		if (!StringUtils.isEmpty(type)) {
			warpper.likeRight("type ", type);
		}
		String companyType = (String) params.get("companyType");
		if (!StringUtils.isEmpty(companyType)) {
			warpper.likeRight("company_type ", companyType);
		}
		String education = (String) params.get("education");
		if (!StringUtils.isEmpty(education)) {
			warpper.likeRight("education ", education);
		}
		String vacancyNum = (String) params.get("vacancyNum");
		if (!StringUtils.isEmpty(vacancyNum)) {
			warpper.likeRight("vacancy_num ", vacancyNum);
		}
		String duty = (String) params.get("duty");
		if (!StringUtils.isEmpty(duty)) {
			warpper.likeRight("duty ", duty);
		}
		String status = (String) params.get("status");
		if (!StringUtils.isEmpty(status)) {
			warpper.likeRight("status ", status);
		}
		String createdTime = (String) params.get("createdTime");
		if (!StringUtils.isEmpty(createdTime)) {
			warpper.likeRight("created_time ", createdTime);
		}
		String updatedTime = (String) params.get("updatedTime");
		if (!StringUtils.isEmpty(updatedTime)) {
			warpper.likeRight("updated_time ", updatedTime);
		}
		String publishDate = (String) params.get("publishDate");
		if (!StringUtils.isEmpty(publishDate)) {
			warpper.likeRight("publish_date ", publishDate);
		}
		warpper.apply(params.get(Constant.SQL_FILTER) != null, (String) params.get(Constant.SQL_FILTER));
		IPage<BizJobEntity> page = this.page(new Query<BizJobEntity>().getPage(params), warpper);

		return new PageUtils(page);
	}

}
