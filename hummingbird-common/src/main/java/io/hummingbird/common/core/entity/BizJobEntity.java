package io.hummingbird.common.core.entity;

import java.io.Serializable;
import java.util.Date;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

import cn.afterturn.easypoi.excel.annotation.Excel;
import io.swagger.annotations.ApiModel;
import lombok.Data;

/**
 * 
 * 
 * @author Top
 * @email xxx@gmail.com
 * @date 2020-09-16 09:26:51
 */
@Data
@TableName("biz_job")
@ApiModel(value = "")
public class BizJobEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * id
	 */
	@TableId
	@Excel(name = "id")
	private Long id;
	/**
	 * 职位名称
	 */
	@Excel(name = "职位名称")
	private String name;
	/**
	 * 所在城市
	 */
	@Excel(name = "所在城市")
	private String city;
	/**
	 * 职位类型
	 */
	@Excel(name = "职位类型")
	private String type;
	/**
	 * 公司类型
	 */
	@Excel(name = "公司类型")
	private String companyType;
	/**
	 * 学历
	 */
	@Excel(name = "学历")
	private String education;
	/**
	 * 空缺数量
	 */
	@Excel(name = "空缺数量")
	private Integer vacancyNum;
	/**
	 * 职责描述
	 */
	@Excel(name = "职责描述")
	private String duty;
	/**
	 * 状态
	 */
	@Excel(name = "状态")
	private Integer status;
	/**
	 * 创建时间
	 */
	@Excel(name = "创建时间", format = "yyyy-MM-dd HH:mm:ss", width = 20)
	private Date createdTime;
	/**
	 * 最后更新时间
	 */
	@Excel(name = "最后更新时间", format = "yyyy-MM-dd HH:mm:ss", width = 20)
	private Date updatedTime;
	/**
	 * 发布日期
	 */
	@Excel(name = "发布日期")
	private Date publishDate;

}
