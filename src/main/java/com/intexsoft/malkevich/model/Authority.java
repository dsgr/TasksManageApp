package com.intexsoft.malkevich.model;

import org.springframework.security.core.GrantedAuthority;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Model for {@link User} role table
 */
@Entity
@Table(name = "authorities")
public class Authority extends AbstractEntity implements GrantedAuthority {

	private static final long serialVersionUID = -2482110092389856360L;

	/**
	 * Name of {@link User} role
	 */
	@Column
	public String authority;

	@Override
	public String getAuthority() {
		return authority;
	}
}
