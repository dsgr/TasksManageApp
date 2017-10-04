package com.intexsoft.malkevich.service;

import com.intexsoft.malkevich.model.User;

/**
 * Service for generating token
 */
public interface TokenService {

	/**
	 * Generate token
	 * @return generated token
	 */
	String generate(User user, String password);
}
