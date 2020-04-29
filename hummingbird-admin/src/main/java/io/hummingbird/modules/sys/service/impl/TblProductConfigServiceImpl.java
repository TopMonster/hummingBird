package io.hummingbird.modules.sys.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import io.hummingbird.common.annotation.DataFilter;
import io.hummingbird.common.dao.TblProductConfigDao;
import io.hummingbird.common.entity.TblProductConfigEntity;
import io.hummingbird.common.enums.BusinessDataFilterType;
import io.hummingbird.common.enums.ProductStatusEnum;
import io.hummingbird.common.utils.DataFilterUtil;
import io.hummingbird.common.utils.PageUtils;
import io.hummingbird.common.utils.Query;
import io.hummingbird.modules.sys.service.TblProductConfigService;

@Service("tblProductConfigService")
public class TblProductConfigServiceImpl extends ServiceImpl<TblProductConfigDao, TblProductConfigEntity>
		implements TblProductConfigService {

	@Autowired
	private TblProductConfigDao tblProductConfigDao;

	@Override
	public PageUtils queryPage(Map<String, Object> params) {
		QueryWrapper<TblProductConfigEntity> warpper = new QueryWrapper<TblProductConfigEntity>();
		String id = (String) params.get("id");
		if (!StringUtils.isEmpty(id)) {
			warpper.likeLeft("ID ", id);
		}
		String createdTime = (String) params.get("createdTime");
		if (!StringUtils.isEmpty(createdTime)) {
			warpper.likeLeft("created_time ", createdTime);
		}
		String updatedTime = (String) params.get("updatedTime");
		if (!StringUtils.isEmpty(updatedTime)) {
			warpper.likeLeft("updated_time ", updatedTime);
		}
		String productType = (String) params.get("productType");
		if (!StringUtils.isEmpty(productType)) {
			warpper.likeLeft("product_type ", productType);
		}
		String productName = (String) params.get("productName");
		if (!StringUtils.isEmpty(productName)) {
			warpper.likeLeft("product_name ", productName);
		}
		String productCode = (String) params.get("productCode");
		if (!StringUtils.isEmpty(productCode)) {
			warpper.likeLeft("product_code ", productCode);
		}
		String productLogo = (String) params.get("productLogo");
		if (!StringUtils.isEmpty(productLogo)) {
			warpper.likeLeft("product_logo ", productLogo);
		}
		String productUrl = (String) params.get("productUrl");
		if (!StringUtils.isEmpty(productUrl)) {
			warpper.likeLeft("product_url ", productUrl);
		}
		String productTag = (String) params.get("productTag");
		if (!StringUtils.isEmpty(productTag)) {
			warpper.likeLeft("product_tag ", productTag);
		}
		String productRate = (String) params.get("productRate");
		if (!StringUtils.isEmpty(productRate)) {
			warpper.likeLeft("product_rate ", productRate);
		}
		String productLimit = (String) params.get("productLimit");
		if (!StringUtils.isEmpty(productLimit)) {
			warpper.likeLeft("product_limit ", productLimit);
		}
		String loanSucMsg = (String) params.get("loanSucMsg");
		if (!StringUtils.isEmpty(loanSucMsg)) {
			warpper.likeLeft("loan_suc_msg ", loanSucMsg);
		}
		String loanNum = (String) params.get("loanNum");
		if (!StringUtils.isEmpty(loanNum)) {
			warpper.likeLeft("loan_num ", loanNum);
		}
		String slogan = (String) params.get("slogan");
		if (!StringUtils.isEmpty(slogan)) {
			warpper.likeLeft("slogan ", slogan);
		}
		String showTerminal = (String) params.get("showTerminal");
		if (!StringUtils.isEmpty(showTerminal)) {
			warpper.likeLeft("show_terminal ", showTerminal);
		}
		String partnerName = (String) params.get("partnerName");
		if (!StringUtils.isEmpty(partnerName)) {
			warpper.likeLeft("partner_name ", partnerName);
		}
		String business = (String) params.get("business");
		if (!StringUtils.isEmpty(business)) {
			warpper.likeLeft("business ", business);
		}
		String cpa = (String) params.get("cpa");
		if (!StringUtils.isEmpty(cpa)) {
			warpper.likeLeft("cpa ", cpa);
		}
		String cpc = (String) params.get("cpc");
		if (!StringUtils.isEmpty(cpc)) {
			warpper.likeLeft("cpc ", cpc);
		}
		String cps = (String) params.get("cps");
		if (!StringUtils.isEmpty(cps)) {
			warpper.likeLeft("cps ", cps);
		}
		String description = (String) params.get("description");
		if (!StringUtils.isEmpty(description)) {
			warpper.likeLeft("description ", description);
		}
		String status = (String) params.get("status");
		if (!StringUtils.isEmpty(status)) {
			warpper.likeLeft("status ", status);
		}
		String deptId = (String) params.get("deptId");
		if (!StringUtils.isEmpty(deptId)) {
			warpper.likeLeft("dept_id ", deptId);
		}
		// 业务方或部门数据权限控制
		String dataFilterSql = DataFilterUtil.buildDateFilterSql(params,BusinessDataFilterType.product);
		warpper.apply(dataFilterSql != null, dataFilterSql);
		IPage<TblProductConfigEntity> page = this.page(new Query<TblProductConfigEntity>().getPage(params), warpper);

		List<TblProductConfigEntity> list = page.getRecords();
		for (TblProductConfigEntity tblProductConfigEntity : list) {
			if ("0".equalsIgnoreCase(tblProductConfigEntity.getStatus())) {
				tblProductConfigEntity.setStatus("下线");
			} else {
				tblProductConfigEntity.setStatus("上线");
			}
		}

		return new PageUtils(page);
	}

	@Override
	public TblProductConfigEntity queryByProductCode(String productCode) {
		return tblProductConfigDao
				.selectOne(new QueryWrapper<TblProductConfigEntity>().eq("product_code", productCode));
	}

	@Override
	public List<TblProductConfigEntity> listAll() {
		return tblProductConfigDao.selectList(
				new QueryWrapper<TblProductConfigEntity>().eq("status", ProductStatusEnum.ONLINE.getCode()));
	}

}
