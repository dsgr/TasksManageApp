package com.intexsoft.malkevich.security.filter;

import com.intexsoft.malkevich.controller.UserController;
import com.intexsoft.malkevich.service.TokenAuthenticationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class AuthenticationTokenFilter extends GenericFilterBean {
	private static final Logger LOGGER = LoggerFactory.getLogger(AuthenticationTokenFilter.class);
	private final TokenAuthenticationService authenticationService;

	public AuthenticationTokenFilter(TokenAuthenticationService authenticationService) {
		this.authenticationService = authenticationService;
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain)
			throws IOException, ServletException {
		LOGGER.info("SECURITY: Starts doFilter");
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		Authentication authentication = authenticationService.authenticate(httpRequest);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		filterChain.doFilter(request, response);
		SecurityContextHolder.getContext().setAuthentication(null);
	}
}
