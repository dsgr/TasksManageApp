package com.intexsoft.malkevich.service.impl;

import com.intexsoft.malkevich.model.Authority;
import com.intexsoft.malkevich.repository.AuthorityRepository;
import com.intexsoft.malkevich.service.AuthorityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * It used to implement the techniques {@link AuthorityService}
 */
@Service
public class AuthorityServiceImpl implements AuthorityService {

	@Autowired
	private AuthorityRepository roleRepository;

	@Override
	public List<Authority> findAll() {
		return roleRepository.findAll();
	}

	@Override
	public Authority findByAuthority(String authority) {
		return roleRepository.findByAuthority(authority);
	}
}
