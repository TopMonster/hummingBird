package io.hummingbird.enums;

/**
 * 业务错误码枚举
 */
public enum ApiErrorCodeEnum {
	ALREADY_REGISTED(10000, "亲爱的用户,您的手机号已注册,请直接下载app拿钱吧!");
	public final Integer code;
	public final String message;

	private ApiErrorCodeEnum(Integer code, String message) {
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
