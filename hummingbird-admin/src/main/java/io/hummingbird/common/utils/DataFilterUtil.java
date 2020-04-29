package io.hummingbird.common.utils;

import java.util.Map;

import io.hummingbird.common.enums.BusinessDataFilterType;

public class DataFilterUtil {

	public static String buildDateFilterSql(Map<String, Object> params,BusinessDataFilterType businessDataFilterType) {
		// 业务方或部门数据权限控制
		if (null != params.get(Constant.SQL_FILTER)) {
			//渠道所属商务过滤
			if(BusinessDataFilterType.channel.equals(businessDataFilterType)){
				StringBuilder sqlFilter = new StringBuilder();
				sqlFilter.append(" (");
				sqlFilter.append((String) params.get(Constant.CHANNEL_BUSINESS_FILTER));
				sqlFilter.append(" or ");
				sqlFilter.append((String) params.get(Constant.SQL_FILTER));
				sqlFilter.append(")");
				return sqlFilter.toString();
			}
			//产品所属商务过滤
			if(BusinessDataFilterType.product.equals(businessDataFilterType)){
				StringBuilder sqlFilter = new StringBuilder();
				sqlFilter.append(" (");
				sqlFilter.append((String) params.get(Constant.PRODUCT_BUSINESS_FILTER));
				sqlFilter.append(" or ");
				sqlFilter.append((String) params.get(Constant.SQL_FILTER));
				sqlFilter.append(")");
				return sqlFilter.toString();
			}
			return (String) params.get(Constant.SQL_FILTER);
		}
		return null;
	}
	
}



