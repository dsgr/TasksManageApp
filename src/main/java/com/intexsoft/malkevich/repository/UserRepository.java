package com.intexsoft.malkevich.repository;

import com.intexsoft.malkevich.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository for {@link User}
 */
public interface UserRepository extends JpaRepository<User, Long> {

	User findByUsername(String username);
	User findById(Long id);


}
