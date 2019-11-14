package io.hummingbird.controller;

import io.hummingbird.common.service.SysDictService;
import io.hummingbird.common.utils.R;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 推荐管理
 *
 */
@Api(tags = "推荐文案管理")
@RestController
@RequestMapping("api/recommend")
public class RecommendController {

	@Autowired
	private SysDictService sysDictService;

	@GetMapping("/list")
	@ApiOperation(value = "获取所有推荐话术")
	public R list() {
		Map<String, List<String>> maps = new HashMap<>();
		maps.put("customerNames", sysDictService.listByType("customerNames"));
		maps.put("price", sysDictService.listByType("price"));
		return R.ok(maps);
	}

}
