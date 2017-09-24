package com.intexsoft.malkevich.controller;

import com.intexsoft.malkevich.model.Task;
import com.intexsoft.malkevich.service.TaskService;
import com.intexsoft.malkevich.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * RestController for {@link com.intexsoft.malkevich.model.Task}
 */
@RestController
public class TaskController {

	private static final Logger LOGGER = LoggerFactory.getLogger(TaskController.class);

	@Autowired
	private UserService userService;
	@Autowired
    private TaskService taskService;

	/**
	 * Add new {@link com.intexsoft.malkevich.model.Task}
	 */
	@RequestMapping(value = "/task/add", method = RequestMethod.POST)
	public ResponseEntity<?> add(@RequestBody Task task) {
		LOGGER.info("Start add new task");
		try {
			return new ResponseEntity<>(taskService.add(task), HttpStatus.CREATED);
		} catch (Exception e) {
			LOGGER.info("Error while add new task. " + e.getLocalizedMessage());
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/task/all", method = RequestMethod.GET)
	public ResponseEntity<?> getAll() {
		LOGGER.info("Start get all tasks");
		try {
			return new ResponseEntity<>(taskService.findAll(), HttpStatus.OK);
		} catch (Exception e) {
			LOGGER.info("Error while get all users " + e.getLocalizedMessage());
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * Delete task, finded by id
	 */
	@RequestMapping(value = "/task/delete/{taskId}", method = RequestMethod.GET)
	public ResponseEntity<?> delete(@PathVariable(value="taskId") Long taskId) {
		LOGGER.info("Start delete task with id={}", taskId);
		try {
			taskService.deleteById(taskId);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			LOGGER.info("Error while delete task " + e.getLocalizedMessage());
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}



}
