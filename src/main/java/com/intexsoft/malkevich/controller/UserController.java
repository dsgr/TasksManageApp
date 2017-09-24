package com.intexsoft.malkevich.controller;

import com.intexsoft.malkevich.model.User;
import com.intexsoft.malkevich.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * RestController for {@link User}
 */
@RestController
public class UserController {

	private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private UserService userService;

	/**
	 * Add new {@link User}
	 */
	@RequestMapping(value = "/user/add", method = RequestMethod.POST)
	public ResponseEntity<?> registration(@RequestBody User user) {
		LOGGER.info("Start add new user");
		try {
			return new ResponseEntity<>(userService.registration(user), HttpStatus.CREATED);
		} catch (Exception e) {
			LOGGER.info("Error while add new user. " + e.getLocalizedMessage());
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * Add MANAGER_ROLE to user, finded by id
	 */
	@RequestMapping(value = "/user/setmanager/{userId}", method = RequestMethod.PUT)
	public ResponseEntity<?> setMananager(@PathVariable(value="userId") Long userId) {
		LOGGER.info("Start add MANAGER_ROLE for user with id={}", userId);
		try {
			return new ResponseEntity<>(userService.setMananager(userId), HttpStatus.OK);
		} catch (Exception e) {
			LOGGER.info("Error while add MANAGER_ROLE " + e.getLocalizedMessage());
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
    /**
     * Add ADMIN_ROLE to user, finded by id
     */
    @RequestMapping(value = "/user/setadmin/{userId}", method = RequestMethod.PUT)
    public ResponseEntity<?> setAdmin(@PathVariable(value="userId") Long userId) {
        LOGGER.info("Start add ADMIN_ROLE for user with id={}", userId);
        try {
            return new ResponseEntity<>(userService.setAdmin(userId), HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.info("Error while add ADMIN_ROLE " + e.getLocalizedMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/user/all", method = RequestMethod.GET)
    public ResponseEntity<?> getAll() {
        LOGGER.info("Start get all users");
        try {
            return new ResponseEntity<>(userService.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.info("Error while get all users " + e.getLocalizedMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }



    /**
     * Delete user, finded by id
     */
    @RequestMapping(value = "/user/delete/{userId}", method = RequestMethod.GET)
    public ResponseEntity<?> delete(@PathVariable(value="userId") Long userId) {
        LOGGER.info("Start delete user with id={}", userId);
        try {
            userService.deleteById(userId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.info("Error while delete user " + e.getLocalizedMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }



}
