package io.hummingbird.common.entity;

import java.io.Serializable;
import java.util.Date;

import com.baomidou.mybatisplus.annotation.TableField;
import org.springframework.format.annotation.NumberFormat;
import org.springframework.format.annotation.NumberFormat.Style;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import cn.afterturn.easypoi.excel.annotation.Excel;
import io.hummingbird.common.serialize.DoubleSerialize;
import io.swagger.annotations.ApiModel;
import lombok.Data;

/**
 * 产品配置
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-03-27 22:09:10
 */
@Data
@TableName("tbl_product_config")
@ApiModel(value = "产品配置")
public class TblProductConfigEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 
	 */
	@TableId
	@Excel(name = "")
	private Integer id;
	/**
	 * 创建时间
	 */
	@Excel(name = "创建时间", format = "yyyy-MM-dd HH:mm:ss", width = 20)
	private Date createdTime;
	/**
	 * 修改时间
	 */
	@Excel(name = "修改时间", format = "yyyy-MM-dd HH:mm:ss", width = 20)
	private Date updatedTime;
	/**
	 * 产品类型
	 */
	@Excel(name = "产品类型")
	private String productType;
	/**
	 * 产品名称
	 */
	@Excel(name = "产品名称")
	private String productName;
	/**
	 * 产品编码
	 */
	@Excel(name = "产品编码")
	private String productCode;
	/**
	 * 产品logo
	 */
	@Excel(name = "产品logo")
	private String productLogo;
	/**
	 * 产品url
	 */
	@Excel(name = "产品url")
	private String productUrl;
	/**
	 * 产品标签
	 */
	@Excel(name = "产品标签")
	private String productTag;
	/**
	 * 利率文案
	 */
	@Excel(name = "利率文案")
	private String productRate;
	/**
	 * 额度文案
	 */
	@Excel(name = "额度文案")
	private String productLimit;
	/**
	 * 放款成功率
	 */
	@Excel(name = "放款成功率")
	private String loanSucMsg;
	/**
	 * 放款人数
	 */
	@Excel(name = "放款人数")
	private Integer loanNum;
	/**
	 * 产品宣传语
	 */
	@Excel(name = "产品宣传语")
	private String slogan;
	/**
	 * 支持展示客户端
	 */
	@Excel(name = "支持展示客户端")
	private String showTerminal;
	/**
	 * 机构名称
	 */
	@Excel(name = "机构名称")
	private String partnerName;
	/**
	 * 对接商务
	 */
	@Excel(name = "对接商务")
	private String business;
	/**
	 * CPA单价
	 */
	@Excel(name = "CPA单价")
	@NumberFormat(style = Style.CURRENCY)
	private Double cpa;
	/**
	 * CPC单价
	 */
	@Excel(name = "CPC单价")
	@NumberFormat(style = Style.CURRENCY)
	@JsonSerialize(using = DoubleSerialize.class)
	private Double cpc;
	/**
	 * CPS比例
	 */
	@Excel(name = "CPS比例")
	@NumberFormat(style = Style.CURRENCY)
	@JsonSerialize(using = DoubleSerialize.class)
	private Double cps;
	/**
	 * 备注
	 */
	@Excel(name = "备注")
	private String description;
	/**
	 * 状态
	 */
	@Excel(name = "状态")
	private String status;
	/**
	 * 所属部门
	 */
	@Excel(name = "所属部门")
	private Long deptId;
	/**
	 * Andam orderNum 排序
	 */
	@TableField(exist = false)
	private Integer orderNum;

}
