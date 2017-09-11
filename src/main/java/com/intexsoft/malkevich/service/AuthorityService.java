package com.intexsoft.malkevich.service;

import com.intexsoft.malkevich.model.Authority;

import java.util.List;

/**
 * Service for {@link Authority}
 */
public interface AuthorityService {

	/**
	 * Find all {@link Authority}
	 */
	List<Authority> findAll();

	/**
	 * Find {@link Authority}
	 */
	Authority findByAuthority(String authority);
}
