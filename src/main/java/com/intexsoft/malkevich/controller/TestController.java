package com.intexsoft.malkevich.controller;

import com.intexsoft.malkevich.model.User;
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

@RestController
@RequestMapping("/test")
public class TestController {

	@RequestMapping(value = "/test-security-a", method = RequestMethod.GET)
	public ResponseEntity<?> test() {
			return new ResponseEntity<>("/test-security-a", HttpStatus.OK);
	}
}
