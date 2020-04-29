package io.hummingbird.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import io.hummingbird.common.dao.TblProductConfigDao;
import io.hummingbird.common.entity.TblProductConfigEntity;
import io.hummingbird.entity.ProductEntity;
import io.hummingbird.service.ProductService;

@Service("productService")
public class ProductServiceImpl extends ServiceImpl<TblProductConfigDao, TblProductConfigEntity>
		implements ProductService {

	@Autowired
	private TblProductConfigDao tblProductConfigDao;

	@Override
	public TblProductConfigEntity listByCode(String productCode) {
		return tblProductConfigDao.selectOne(
				new QueryWrapper<TblProductConfigEntity>().eq("product_code", productCode).orderByDesc("created_time"));
	}

	@Override
	public JSONObject listByShelfCode(String shelfCodes, String osType) {
		JSONObject jsonObject = new JSONObject();
		if (StringUtils.isBlank(shelfCodes)) {
			return jsonObject;
		}

		List<String> shelfCodeList = Arrays.asList(shelfCodes.split(","));
		for (String shelfCode : shelfCodeList) {
			JSONArray array = new JSONArray();
			jsonObject.put(shelfCode, array);

			List<TblProductConfigEntity> tblProductConfigEntityList = baseMapper.listTblProductConfigEntity(shelfCode);
			// 最终要返回的产品List
			List<TblProductConfigEntity> productConfigEntityList = new ArrayList<>();
			List<TblProductConfigEntity> productConfigEntityListTemp = new ArrayList<>();
			productConfigEntityListTemp.add(tblProductConfigEntityList.get(0));
			for (int i = 1; i < tblProductConfigEntityList.size(); i++) {
				if (productConfigEntityListTemp.get(0).getOrderNum() == tblProductConfigEntityList.get(i)
						.getOrderNum()) {
					productConfigEntityListTemp.add(tblProductConfigEntityList.get(i));
				} else {
					// 打乱productConfigEntityListTemp
					Collections.shuffle(productConfigEntityListTemp);
					productConfigEntityList.addAll(productConfigEntityListTemp);
					productConfigEntityListTemp.clear();
					productConfigEntityListTemp.add(tblProductConfigEntityList.get(i));
				}
			}
			// 加入最后一个
			productConfigEntityList.add(tblProductConfigEntityList.get(tblProductConfigEntityList.size() - 1));

			for (TblProductConfigEntity produtConfig : productConfigEntityList) {
				if (ifShow(osType, produtConfig)) {
					ProductEntity product = new ProductEntity();
					BeanUtils.copyProperties(produtConfig, product);
					product.setOrderNum(produtConfig.getOrderNum());
					jsonObject.getJSONArray(shelfCode).add(product);
				}
			}
		}
		return jsonObject;
	}

	/**
	 * 根据终端类型，判断该产品是否应该展示
	 * 
	 * @param osType
	 * @param tblProductConfigEntity
	 * @return
	 */
	private boolean ifShow(String osType, TblProductConfigEntity tblProductConfigEntity) {
		return null != tblProductConfigEntity && (tblProductConfigEntity.getShowTerminal().equalsIgnoreCase(osType)
				|| "ALL".equalsIgnoreCase(tblProductConfigEntity.getShowTerminal()));
	}
}
