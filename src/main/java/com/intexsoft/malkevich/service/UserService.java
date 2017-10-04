package com.intexsoft.malkevich.service;

import com.intexsoft.malkevich.model.User;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service for {@link User}
 */
public interface UserService {

	List<User> findAll();

	User findByUsername(String username);

	@Transactional
	User save(User user);
	@Transactional
	User registration(User user);
	@Transactional
	User setMananager(Long userId);
	@Transactional
	User setAdmin(Long userId);
	@Transactional
	void deleteAll();
	@Transactional
	void deleteById(Long userId);
	@Transactional
	User update(User user);
}
