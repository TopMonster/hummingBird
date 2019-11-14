/**
 * Copyright (c) 2016-2019 蜂鸟开源 All rights reserved.
 *
 * https://www.hummingbird.io
 *
 * 版权所有，侵权必究！
 */

package io.hummingbird.modules.oss.controller;

import java.util.Arrays;
import java.util.Date;
import java.util.Map;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;

import io.hummingbird.common.exception.RRException;
import io.hummingbird.common.utils.ConfigConstant;
import io.hummingbird.common.utils.Constant;
import io.hummingbird.common.utils.DateUtils;
import io.hummingbird.common.utils.PageUtils;
import io.hummingbird.common.utils.R;
import io.hummingbird.common.validator.ValidatorUtils;
import io.hummingbird.common.validator.group.AliyunGroup;
import io.hummingbird.common.validator.group.QcloudGroup;
import io.hummingbird.common.validator.group.QiniuGroup;
import io.hummingbird.modules.oss.cloud.CloudStorageConfig;
import io.hummingbird.modules.oss.cloud.OSSFactory;
import io.hummingbird.modules.oss.entity.SysOssEntity;
import io.hummingbird.modules.oss.service.SysOssService;
import io.hummingbird.modules.sys.service.SysConfigService;

/**
 * 文件上传
 *
 * @author Top
 */
@RestController
@RequestMapping("sys/oss")
public class SysOssController {
	@Autowired
	private SysOssService sysOssService;
	@Autowired
	private SysConfigService sysConfigService;

	private final static String KEY = ConfigConstant.CLOUD_STORAGE_CONFIG_KEY;

	/**
	 * 列表
	 */
	@RequestMapping("/list")
	@RequiresPermissions("sys:oss:all")
	public R list(@RequestParam Map<String, Object> params) {
		PageUtils page = sysOssService.queryPage(params);

		return R.ok().put("page", page);
	}

	/**
	 * 云存储配置信息
	 */
	@RequestMapping("/config")
	@RequiresPermissions("sys:oss:all")
	public R config() {
		CloudStorageConfig config = sysConfigService.getConfigObject(KEY, CloudStorageConfig.class);

		return R.ok().put("config", config);
	}

	/**
	 * 保存云存储配置信息
	 */
	@RequestMapping("/saveConfig")
	@RequiresPermissions("sys:oss:all")
	public R saveConfig(@RequestBody CloudStorageConfig config) {
		// 校验类型
		ValidatorUtils.validateEntity(config);

		if (config.getType() == Constant.CloudService.QINIU.getValue()) {
			// 校验七牛数据
			ValidatorUtils.validateEntity(config, QiniuGroup.class);
		} else if (config.getType() == Constant.CloudService.ALIYUN.getValue()) {
			// 校验阿里云数据
			ValidatorUtils.validateEntity(config, AliyunGroup.class);
		} else if (config.getType() == Constant.CloudService.QCLOUD.getValue()) {
			// 校验腾讯云数据
			ValidatorUtils.validateEntity(config, QcloudGroup.class);
		}

		sysConfigService.updateValueByKey(KEY, new Gson().toJson(config));

		return R.ok();
	}

	/**
	 * 上传文件
	 */
	@RequestMapping(value = "/upload", produces = "application/json;charset=utf-8")
	@RequiresPermissions("sys:oss:all")
	public R upload(@RequestParam("file") MultipartFile file) throws Exception {
		if (file.isEmpty()) {
			throw new RRException("上传文件不能为空");
		}

		// 上传文件
		// String suffix =
		// file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
		CloudStorageConfig config = sysConfigService.getConfigObject(KEY, CloudStorageConfig.class);
		String path = config.getAliyunPrefix() + "/" + DateUtils.format(new Date(), "yyyyMMddHHmmss") + "/"
				+ file.getOriginalFilename();
		String url = OSSFactory.build().upload(file.getBytes(), path);

		// 保存文件信息
		SysOssEntity ossEntity = new SysOssEntity();
		ossEntity.setUrl(url);
		ossEntity.setCreateDate(new Date());
		sysOssService.save(ossEntity);

		return R.ok().put("url", url);
	}

	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("sys:oss:all")
	public R delete(@RequestBody Long[] ids) {
		sysOssService.removeByIds(Arrays.asList(ids));

		return R.ok();
	}

}
