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
    @Autowired
    private TaskRepository taskRepository;

    @Override
    public List<Task> findAll() {
        return taskRepository.findAll();
    }

    @Override
    public Task findByUserId(Long userId) {
        return null;
    }

    @Override
    public Task save(Task task) {
        return null;
    }

    @Override
    public Task add(Task task) {
        LOGGER.debug("add task" + task.toString());
        task.taskStatusId = (task.userId == null) ? 1L : 2L;
        taskRepository.saveAndFlush(task);
        return null;
    }

    @Override
    public void deleteById(Long taskId) {
        taskRepository.delete(taskId);
    }

    @Override
    public void deleteAll() {

    }


    @Override
    public Task update(Task task) {
        return null;
    }
}
