package com.intexsoft.malkevich.service.impl;

import com.intexsoft.malkevich.model.Authority;
import com.intexsoft.malkevich.model.User;
import com.intexsoft.malkevich.repository.UserRepository;
import com.intexsoft.malkevich.service.AuthorityService;
import com.intexsoft.malkevich.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * It used to implement the techniques {@link UserService}
 */
@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private AuthorityService authorityService;

	@Override
	public List<User> findAll() {
		return userRepository.findAll();
	}

	@Override
	public User findByUsername(String username) {
		return userRepository.findByUsername(username);
	}

	@Override
	public User save(User user) {
		return userRepository.saveAndFlush(user);
	}

	@Override
	public User registration(User user) {				
		List<Authority> authorities = new ArrayList<>();
		authorities.add(authorityService.findByAuthority("ROLE_USER"));
		user.authorities = authorities;
		return userRepository.saveAndFlush(user);
	}

	@Override
	public User setMananager(Long userId) {
        User user = userRepository.findById(userId);
        user.authorities.add(authorityService.findByAuthority("ROLE_MANAGER"));
	    return userRepository.saveAndFlush(user);
	}

    @Override
    public User setAdmin(Long userId) {
        User user = userRepository.findById(userId);
        user.authorities.add(authorityService.findByAuthority("ROLE_ADMIN"));
        return userRepository.saveAndFlush(user);
    }

    @Override
    public void deleteById(Long userId) {
        userRepository.delete(userId);
    }

	@Override
	public void deleteAll() {
		userRepository.deleteAll();
	}

	@Override
	public User update(User user) {
		return userRepository.saveAndFlush(user);
	}
}
