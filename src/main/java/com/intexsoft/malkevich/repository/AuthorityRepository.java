package com.intexsoft.malkevich.repository;

import com.intexsoft.malkevich.model.Authority;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository for {@link Authority}
 */
public interface AuthorityRepository extends JpaRepository<Authority, Long> {

	Authority findByAuthority(String authority);
}
