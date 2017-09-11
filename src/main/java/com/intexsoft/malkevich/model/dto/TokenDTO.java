package com.intexsoft.malkevich.model.dto;

import com.intexsoft.malkevich.model.User;

import java.io.Serializable;

public class TokenDTO implements Serializable {

	private static final long serialVersionUID = 9062665063552658476L;

	public String token;

	public User user;

	public TokenDTO(String token, User user) {
		this.token = token;
		this.user = user;
	}
}
