package io.hummingbird.entity;

import io.hummingbird.common.core.entity.TblProductConfigEntity;
import lombok.Data;

/**
 * 产品配置
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-03-06 20:59:36
 */
@Data
public class ProductEntity extends TblProductConfigEntity {
	private static final long serialVersionUID = 1L;

	/**
	 * 排序
	 */
	private Integer orderNum;

}
