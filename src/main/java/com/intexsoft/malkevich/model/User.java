package com.intexsoft.malkevich.model;

import javax.persistence.*;
import java.util.List;

/**
 * Model for users table
 */
@Entity
@Table(name = "users")
public class User extends AbstractEntity {

	private static final long serialVersionUID = 7232927597102396226L;

	@Column(name = "username")
	public String username;
	@Column
	public String password;
	@Column(name = "first_name")
	public String firstName;
	@Column(name = "last_name")
	public String lastName;
	@Column(name = "phone_number")
	public String phoneNumber;
	@Column
	public String mail;
	@ManyToMany(targetEntity = Authority.class, fetch = FetchType.EAGER)
	@JoinTable(name = "users_to_authorities", joinColumns = { @JoinColumn(name = "user_id") }, inverseJoinColumns = {
			@JoinColumn(name = "authority_id") })
	public List<Authority> authorities;

	@Override
	public String toString() {
		return "User{" +
				"username='" + username + '\'' +
				", password='" + password + '\'' +
				", firstName='" + firstName + '\'' +
				", lastName='" + lastName + '\'' +
				", phoneNumber='" + phoneNumber + '\'' +
				", mail='" + mail + '\'' +
				", authorities=" + authorities +
				'}';
	}
}
