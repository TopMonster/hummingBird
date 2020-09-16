package io.hummingbird.common.core.enums;

/**
 * 业务错误码枚举
 */
public enum ErrorCodeEnum {
	BIZ(-1, "业务校验异常"), TOKEN_EXPIRE(-2, "Token失效,请重新登录"), SERVER_INTERNAL(500, "未知异常，请联系管理员");
	public final Integer code;
	public final String message;

	private ErrorCodeEnum(Integer code, String message) {
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
