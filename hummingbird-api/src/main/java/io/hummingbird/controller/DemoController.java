package io.hummingbird.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.hummingbird.common.core.entity.UserEntity;
import io.hummingbird.common.utils.R;
import io.hummingbird.common.validator.ValidatorUtils;
import io.hummingbird.entity.LoginRequest;
import io.hummingbird.entity.RegisterRqeuest;
import io.hummingbird.service.UserService;
import io.hummingbird.util.JwtUtils;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

/**
 * 推荐管理
 *
 */
@Api(tags = "示例")
@RestController
@RequestMapping("api/demo")
public class DemoController {
	@Autowired
	private UserService userService;
	@Autowired
	private JwtUtils jwtUtils;

	@GetMapping("/list")
	@ApiOperation(value = "获取列表")
	public R list() {
		Map<String, String> maps = new HashMap<>();
		maps.put("1", "1");
		maps.put("2", "2");
		return R.ok(maps);
	}

	/**
	 * 登录
	 */
	@PostMapping("/login")
	@ApiOperation("登录")
	public R login(@RequestBody LoginRequest form) {
		// 表单校验
		ValidatorUtils.validateEntity(form);

		// 用户登录
		String userId = userService.login(form);

		// 生成token
		String token = jwtUtils.generateToken(userId);

		Map<String, Object> map = new HashMap<>();
		map.put("token", token);
		map.put("expire", jwtUtils.getExpire());

		return R.ok(map);
	}

	@PostMapping("/register")
	@ApiOperation("注册")
	public R register(@RequestBody RegisterRqeuest req) {
		// 表单校验
		ValidatorUtils.validateEntity(req);

		UserEntity user = new UserEntity();
		user.setMobile(req.getMobile());
		user.setUsername(req.getMobile());
		user.setPassword(DigestUtils.sha256Hex(req.getPassword()));
		user.setCreateTime(new Date());
		userService.save(user);
		return R.ok();
	}

}
