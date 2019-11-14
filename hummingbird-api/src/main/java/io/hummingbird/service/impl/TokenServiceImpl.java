/**
 * Copyright (c) 2016-2019 蜂鸟开源 All rights reserved.
 *
 * https://www.hummingbird.io
 *
 * 版权所有，侵权必究！
 */

package io.hummingbird.service.impl;

import java.util.Date;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import io.hummingbird.dao.TokenDao;
import io.hummingbird.entity.TokenEntity;
import io.hummingbird.service.TokenService;
import io.hummingbird.common.utils.DateUtils;

@Service("tokenService")
public class TokenServiceImpl extends ServiceImpl<TokenDao, TokenEntity> implements TokenService {
	/**
	 * 30天后过期
	 */
	private final static int EXPIRE = 3600 * 24*30;
	private final static int EXPIRE_DAYS = 30;
	

	@Override
	public TokenEntity queryByToken(String token) {
		return this.getOne(new QueryWrapper<TokenEntity>().eq("token", token));
	}

	@Override
	public TokenEntity createToken(String userId) {
		// 当前时间
		Date now = new Date();
		// 过期时间
		Date expireTime = DateUtils.addDateDays(now, EXPIRE_DAYS);

		// 生成token
		String token = generateToken();

		// 保存或更新用户token
		TokenEntity tokenEntity = new TokenEntity();
		tokenEntity.setUserId(userId);
		tokenEntity.setToken(token);
		tokenEntity.setUpdateTime(now);
		tokenEntity.setExpireTime(expireTime);
		this.saveOrUpdate(tokenEntity);

		return tokenEntity;
	}

	@Override
	public void expireToken(String userId) {
		Date now = new Date();

		TokenEntity tokenEntity = new TokenEntity();
		tokenEntity.setUserId(userId);
		tokenEntity.setUpdateTime(now);
		tokenEntity.setExpireTime(now);
		this.saveOrUpdate(tokenEntity);
	}

	private String generateToken() {
		return UUID.randomUUID().toString().replace("-", "");
	}

	@Override
	public TokenEntity queryByUserId(String userId) {
		return this.getOne(new QueryWrapper<TokenEntity>().eq("user_id", userId));
	}
}
