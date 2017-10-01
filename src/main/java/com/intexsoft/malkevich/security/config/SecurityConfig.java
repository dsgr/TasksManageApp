package com.intexsoft.malkevich.security.config;

import com.intexsoft.malkevich.security.filter.AuthenticationTokenFilter;
import com.intexsoft.malkevich.service.TokenAuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Spring Security configuration class
 */
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private TokenAuthenticationService tokenAuthenticationService;

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests().antMatchers("/").permitAll()
                .antMatchers(HttpMethod.GET, "/api/user/all").hasAnyAuthority("ROLE_ADMIN", "ROLE_MANAGER")
				.antMatchers(HttpMethod.GET, "/api/user/add").hasAnyAuthority("ROLE_ADMIN")
				.antMatchers(HttpMethod.GET, "/api/user/delete").hasAnyAuthority("ROLE_ADMIN")
				.antMatchers(HttpMethod.GET, "/api/user/setadmin").hasAnyAuthority("ROLE_ADMIN")
				.antMatchers(HttpMethod.GET, "/api/user/setmanager").hasAnyAuthority("ROLE_ADMIN")
				.antMatchers(HttpMethod.GET, "/api/task/all").hasAnyAuthority("ROLE_ADMIN", "ROLE_MANAGER")
				.antMatchers(HttpMethod.GET, "/api/task/add").hasAnyAuthority("ROLE_ADMIN")
				.antMatchers(HttpMethod.GET, "/api/task/delete").hasAnyAuthority("ROLE_ADMIN")
				.antMatchers(HttpMethod.GET, "/api/task/setuser").hasAnyAuthority("ROLE_ADMIN")
				.antMatchers(HttpMethod.GET, "/api/task/setstatus").hasAnyAuthority("ROLE_ADMIN")
				.antMatchers(HttpMethod.POST, "/api/customer4/all").hasAnyAuthority("ROLE_ADMIN", "ROLE_MANAGER")
                .antMatchers(HttpMethod.PUT, "/puttest").hasAnyAuthority("ROLE_ADMIN", "ROLE_MANAGER", "ROLE_USER")
				.and().addFilterBefore(new AuthenticationTokenFilter(tokenAuthenticationService),
						UsernamePasswordAuthenticationFilter.class)
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().csrf().disable();
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService()).passwordEncoder(new BCryptPasswordEncoder());
	}

	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Override
	public UserDetailsService userDetailsServiceBean() throws Exception {
		return super.userDetailsServiceBean();
	}
}
