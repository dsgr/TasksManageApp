package com.intexsoft.malkevich.security.exception;

public class UserNotFoundException extends RuntimeException {

	private static final long serialVersionUID = -9217929834133956857L;

	public UserNotFoundException(String message) {
		super(message);
	}
}
