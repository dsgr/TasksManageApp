package com.intexsoft.malkevich.controller;

import com.intexsoft.malkevich.model.Task;
import com.intexsoft.malkevich.model.User;
import com.intexsoft.malkevich.service.TaskService;
import com.intexsoft.malkevich.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * RestController for {@link Task} entity
 */
@RestController
public class TaskController {
    private static final Logger LOGGER = LoggerFactory.getLogger(TaskController.class);
    private final UserService userService;
    private final TaskService taskService;

    @Autowired
    public TaskController(UserService userService, TaskService taskService) {
        this.userService = userService;
        this.taskService = taskService;
    }

    /**
     * Add new {@link com.intexsoft.malkevich.model.Task}
     */
    @RequestMapping(value = "/task/add", method = RequestMethod.POST)
    public ResponseEntity<?> add(@RequestBody Task task) {
        LOGGER.info("Start add new task");
        try {
            return new ResponseEntity<>(taskService.add(task), HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.info("Error while add new task. " + e.getLocalizedMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Save {@link Task}
     */
    @RequestMapping(value = "/task/save", method = RequestMethod.POST)
    public ResponseEntity<?> save(@RequestBody Task task) {
        LOGGER.info("Start save task");
        try {
            return new ResponseEntity<>(taskService.save(task), HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.info("Error while saving task. " + e.getLocalizedMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Return list of all {@link Task}
     */
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
     * Return list of tasks , assigned to user
     */
    @RequestMapping(value = "/task/mylist", method = RequestMethod.POST)
    public ResponseEntity<?> getMylist(@RequestBody User user) {
        LOGGER.info("Start get all tasks for user (mylist)");
        try {
            return new ResponseEntity<>(taskService.findByUserId(user.getId()), HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.info("Error while get all users " + e.getLocalizedMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Delete task, finded by id
     */
    @RequestMapping(value = "/task/delete/{taskId}", method = RequestMethod.GET)
    public ResponseEntity<?> delete(@PathVariable(value = "taskId") Long taskId) {
        LOGGER.info("Start delete task with id={}", taskId);
        try {
            taskService.deleteById(taskId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.info("Error while delete task " + e.getLocalizedMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Change task`s user
     */
    @RequestMapping(value = "/task/changeuser/{taskId}/{userId}", method = RequestMethod.GET)
    public ResponseEntity<?> changeUser(@PathVariable(value = "taskId") Long taskId, @PathVariable(value = "userId") Long userId) {
        LOGGER.info("Start change user on task with id={}", taskId);
        try {
            if (userId == 0) userId = null;
            return new ResponseEntity<>(taskService.changeUser(taskId, userId), HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.info("Error while change user on task " + e.getLocalizedMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Change task`s Status
     */
    @RequestMapping(value = "/task/changestatus/{taskId}/{statusId}", method = RequestMethod.GET)
    public ResponseEntity<?> changeStatus(@PathVariable(value = "taskId") Long taskId, @PathVariable(value = "statusId") Long statusId) {
        LOGGER.info("Start change status on task with id={}", taskId);
        try {
            return new ResponseEntity<>(taskService.changeStatus(taskId, statusId), HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.info("Error while change status on task " + e.getLocalizedMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


}
