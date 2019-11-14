package io.hummingbird.enums;

/**
 * 用户激活状态枚举
 */
public enum UserActiveEnum {
	ACTIVE(1, "已激活"), NOT_ACTIVE(0, "未激活");
	public final Integer code;
	public final String message;

	private UserActiveEnum(Integer code, String message) {
		this.code = code;
		this.message = message;
	}

	public Integer getCode() {
		return code;
	}

	public String getMessage() {
		return message;
	}
}
