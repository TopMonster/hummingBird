
package io.hummingbird.service;

import io.hummingbird.enums.RegisterSourceEnum;

/**
 * 验证码service
 *
 * @author top
 */
public interface VerifyCodeService {

	/**
	 * 发送验证码
	 * 
	 * @param mobile
	 * @param verifyCodeTypeEnum
	 * @return
	 */
	Boolean sendVerifyCode(String mobile, RegisterSourceEnum verifyCodeTypeEnum);

	/**
	 * 验证码验证
	 * 
	 * @param mobile
	 * @param verifyCodeTypeEnum
	 * @param verifyCode
	 * @return
	 */
	Boolean checkVerifyCode(String mobile, RegisterSourceEnum verifyCodeTypeEnum, String verifyCode);

}
