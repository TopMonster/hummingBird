 

package io.hummingbird.service;

import com.baomidou.mybatisplus.extension.service.IService;

import io.hummingbird.entity.TokenEntity;

/**
 * 用户Token
 *
 * @author Top
 */
public interface TokenService extends IService<TokenEntity> {

	TokenEntity queryByToken(String token);
	
	TokenEntity queryByUserId(String userId);

	/**
	 * 生成token
	 * 
	 * @param userId
	 *            用户ID
	 * @return 返回token信息
	 */
	TokenEntity createToken(String userId);

	/**
	 * 设置token过期
	 * 
	 * @param userId
	 *            用户ID
	 */
	void expireToken(String userId);

}
