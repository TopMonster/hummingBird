package io.hummingbird.common.utils;

import java.math.BigDecimal;

public class CalcUtils {
	public static Double defaultDivide(Integer intOne, Integer intTwo) {
		if(intTwo == null || intTwo == 0){
			return 0.0;
		}
		BigDecimal one = new BigDecimal(intOne);
		BigDecimal two = new BigDecimal(intTwo);
		return one.divide(two, Constant.DEFAULT_SCALE, BigDecimal.ROUND_DOWN).doubleValue();
	}

	public static Double defaultDivide(Double intOne, Double intTwo) {
		if(intTwo == null || intTwo == 0){
			return 0.0;
		}
		BigDecimal one = new BigDecimal(intOne);
		BigDecimal two = new BigDecimal(intTwo);
		return one.divide(two, Constant.DEFAULT_SCALE, BigDecimal.ROUND_DOWN).doubleValue();
	}

}
