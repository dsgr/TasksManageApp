package com.intexsoft.malkevich.service;

import org.springframework.security.core.Authentication;

import javax.servlet.http.HttpServletRequest;

public interface TokenAuthenticationService {

	Authentication authenticate(HttpServletRequest request);
}
