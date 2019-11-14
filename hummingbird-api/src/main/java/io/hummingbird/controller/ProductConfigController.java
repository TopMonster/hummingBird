package io.hummingbird.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;

import io.hummingbird.annotation.HeaderInfo;
import io.hummingbird.entity.HeaderInfoEntity;
import io.hummingbird.enums.ShelfCodeEnum;
import io.hummingbird.service.ProductService;
import io.hummingbird.common.entity.TblProductConfigEntity;
import io.hummingbird.common.utils.R;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

/**
 * banner配置
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-03-06 20:59:36
 */
@Api(tags = "产品配置接口")
@RestController
@RequestMapping("api/productconfig")
public class ProductConfigController {

	@Autowired
	private ProductService productService;


	@GetMapping("/listByShelfCode")
	@ApiOperation("通过货架获取产品数据")
	public R list(@RequestParam("shelfCode") ShelfCodeEnum shelfCode,@HeaderInfo HeaderInfoEntity headerInfo) {
		String osType = "ALL";
		if(headerInfo != null){
			osType = headerInfo.getOs();
		}
		JSONObject jsonObject = productService.listByShelfCode(shelfCode.name(),osType);
		return R.ok().put("data", jsonObject);
	}

}
