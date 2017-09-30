package com.intexsoft.malkevich.controller;

import com.intexsoft.malkevich.model.User;
import com.intexsoft.malkevich.model.dto.TokenDTO;
import com.intexsoft.malkevich.service.TokenService;
import com.intexsoft.malkevich.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import static org.apache.commons.lang3.StringUtils.EMPTY;
import static org.apache.commons.lang3.StringUtils.isNotEmpty;

/**
 * Rest controller for login
 */
@RestController
public class AuthenticationController {

    private static final Logger LOGGER = LoggerFactory.getLogger(AuthenticationController.class);

    private final TokenService tokenService;
    private final UserService userService;

    @Autowired
    public AuthenticationController(TokenService tokenService, UserService userService) {
        this.tokenService = tokenService;
        this.userService = userService;
    }

    /**
     * Search user in database by username
     * Generate token
     *
     * @return {@link TokenDTO} model
     */
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> authenticate(@RequestBody User requestUser) {

        LOGGER.info("Start authentication user: " + requestUser.toString());

        if (isNotEmpty(requestUser.username) && isNotEmpty(requestUser.password)) {
            User user = userService.findByUsername(requestUser.username);
            String token = tokenService.generate(user, requestUser.password);
            if (token != null) {
                LOGGER.info("Authentication successful! Returning token" + token);
                user.password = EMPTY;
                return new ResponseEntity<>(new TokenDTO(token, user), HttpStatus.OK);
            }
        }
        LOGGER.error("Authentication failed");
        return new ResponseEntity<>("Authentication failed", HttpStatus.BAD_REQUEST);
    }
}