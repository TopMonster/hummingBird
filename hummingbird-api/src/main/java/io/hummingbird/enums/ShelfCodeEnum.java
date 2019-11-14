package io.hummingbird.enums;

/**
 * 货架枚举
 */
public enum ShelfCodeEnum {
	Recommend("推荐货架"), DayAndNightTop3("无视黑白Top3"), NewestTop3("最新口子Top3"), FastestTop3("秒批口子Top3"), WorstFire(
			"最火口子"), TodayTop3("今日下款Top3"), Total("大全");

	public final String message;

	private ShelfCodeEnum(String message) {
		this.message = message;
	}

}
