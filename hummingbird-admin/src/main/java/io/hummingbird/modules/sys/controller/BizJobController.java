package io.hummingbird.modules.sys.controller;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;

import cn.afterturn.easypoi.entity.vo.NormalExcelConstants;
import cn.afterturn.easypoi.excel.entity.ExportParams;
import cn.afterturn.easypoi.excel.entity.enmus.ExcelType;
import cn.afterturn.easypoi.view.PoiBaseView;
import io.hummingbird.common.core.entity.BizJobEntity;
import io.hummingbird.common.utils.Constant;
import io.hummingbird.common.utils.PageUtils;
import io.hummingbird.common.utils.R;
import io.hummingbird.common.validator.ValidatorUtils;
import io.hummingbird.modules.sys.service.BizJobService;

/**
 * 
 *
 * @author Top
 * @email xxx@gmail.com
 * @date 2020-09-16 10:30:04
 */
@RestController
@RequestMapping("sys/bizjob")
public class BizJobController {
	@Autowired
	private BizJobService bizJobService;

	/**
	 * 列表
	 */
	@RequestMapping("/list")
	@RequiresPermissions("sys:bizjob:list")
	public R list(@RequestParam Map<String, Object> params) {
		PageUtils page = bizJobService.queryPage(params);

		return R.ok().put("page", page);
	}

	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
	@RequiresPermissions("sys:bizjob:info")
	public R info(@PathVariable("id") Long id) {
		BizJobEntity bizJob = bizJobService.getById(id);

		return R.ok().put("bizJob", bizJob);
	}

	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("sys:bizjob:save")
	public R save(@RequestBody BizJobEntity bizJob) {
		bizJobService.save(bizJob);

		return R.ok();
	}

	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("sys:bizjob:update")
	public R update(@RequestBody BizJobEntity bizJob) {
		ValidatorUtils.validateEntity(bizJob);
		bizJobService.updateById(bizJob);

		return R.ok();
	}

	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("sys:bizjob:delete")
	public R delete(@RequestBody Long[] ids) {
		bizJobService.removeByIds(Arrays.asList(ids));

		return R.ok();
	}

	/**
	 * 导出
	 */
	@RequestMapping("/export")
	@RequiresPermissions("sys:bizjob:list")
	public void export(@RequestParam Map<String, Object> params, ModelMap map, HttpServletRequest request,
			HttpServletResponse response) {
		// 查询出原始数据
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
		List<BizJobEntity> list = bizJobService.list(warpper);
		// 设置导出excel模板
		ExportParams exporrParams = new ExportParams("", "", ExcelType.XSSF);
		map.put(NormalExcelConstants.DATA_LIST, list);
		map.put(NormalExcelConstants.CLASS, BizJobEntity.class);
		map.put(NormalExcelConstants.PARAMS, exporrParams);
		map.put(NormalExcelConstants.FILE_NAME, "");
		PoiBaseView.render(map, request, response, NormalExcelConstants.EASYPOI_EXCEL_VIEW);
	}

}
