package com.intexsoft.malkevich.controller;

import com.intexsoft.malkevich.model.Comment;
import com.intexsoft.malkevich.model.Task;
import com.intexsoft.malkevich.model.User;
import com.intexsoft.malkevich.service.CommentService;
import com.intexsoft.malkevich.service.TaskService;
import com.intexsoft.malkevich.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * RestController for {@link Comment} entity
 */
@RestController
public class CommentController {
    private static final Logger LOGGER = LoggerFactory.getLogger(CommentController.class);
    private final UserService userService;
    private final TaskService taskService;
    private final CommentService commentService;


    @Autowired
    public CommentController(UserService userService, TaskService taskService, CommentService commentService) {
        this.userService = userService;
        this.taskService = taskService;
        this.commentService = commentService;
    }

    /**
     * Add new {@link Comment}
     */
    @RequestMapping(value = "/comment/add", method = RequestMethod.POST)
    public ResponseEntity<?> add(@RequestBody Comment comment) {
        LOGGER.info("Start add new comment");
        try {
            return new ResponseEntity<>(commentService.add(comment), HttpStatus.CREATED);
        } catch (Exception e) {
            LOGGER.info("Error while add new comment. " + e.getLocalizedMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Return list of {@link com.intexsoft.malkevich.model.Comment} for {@link Task}
     */
    @RequestMapping(value = "/comment/getallfortask/{taskId}", method = RequestMethod.GET)
    public ResponseEntity<?> getCommetsByTaskId(@PathVariable(value = "taskId") Long taskId) {
        LOGGER.info("Start get all comments for task");
        try {
            return new ResponseEntity<>(commentService.findByTaskId(taskId), HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error while get all comments for task " + e.getLocalizedMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Delete task, finded by id
     */
    @RequestMapping(value = "/comment/delete/{taskId}", method = RequestMethod.GET)
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


}
