package com.intexsoft.malkevich.service.impl;

import com.intexsoft.malkevich.controller.TaskController;
import com.intexsoft.malkevich.model.Task;
import com.intexsoft.malkevich.repository.TaskRepository;
import com.intexsoft.malkevich.repository.UserRepository;
import com.intexsoft.malkevich.service.TaskService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {
    private static final Logger LOGGER = LoggerFactory.getLogger(TaskController.class);
    private TaskRepository taskRepository;

    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public List<Task> findAll() {
        return taskRepository.findAllByOrderById();
    }

    @Override
    public List<Task> findByUserId(Long userId) {
        return taskRepository.findAllByUserId(userId);
    }

    @Override
    public Task save(Task task) {
        LOGGER.debug("saving task" + task.toString());
        return taskRepository.saveAndFlush(task);
    }

    @Override
    public Task add(Task task) {
        LOGGER.debug("add task" + task.toString());
        task.taskStatusId = (task.userId == null) ? 1L : 2L;
        return taskRepository.saveAndFlush(task);
    }

    @Override
    public void deleteById(Long taskId) {
        taskRepository.delete(taskId);
    }

    @Override
    public void deleteAll() {

    }

    @Override
    public Task changeUser(Long taskId, Long userId) {
        Task task = taskRepository.findById(taskId);
        task.userId = userId;
        taskRepository.saveAndFlush(task);
        return task;
    }

    @Override
    public Task changeStatus(Long taskId, Long statusId) {
        Task task = taskRepository.findById(taskId);
        task.taskStatusId = statusId;
        taskRepository.saveAndFlush(task);
        return task;
    }

    @Override
    public Task update(Task task) {
        return null;
    }
}
