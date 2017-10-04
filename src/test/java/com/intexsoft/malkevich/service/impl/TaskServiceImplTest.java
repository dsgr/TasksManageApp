package com.intexsoft.malkevich.service.impl;

import com.intexsoft.malkevich.model.Task;
import com.intexsoft.malkevich.repository.TaskRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.junit.Assert.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class TaskServiceImplTest {

    @Mock
    TaskRepository taskRepository;
    @InjectMocks
    TaskServiceImpl taskService;

    @Test
    public void testAdd(){
        Task task = new Task();
        task.userId = 1L;
        task.taskStatusId = 2L;
        when(taskRepository.saveAndFlush(task)).thenReturn(task);
        assertEquals(task, taskService.add(task));
    }
    @Test
    public void testChangeUser(){
        Task task = new Task();
        task.userId = 1L;
        task.taskStatusId = 2L;
        when(taskRepository.saveAndFlush(task)).thenReturn(task);
        when(taskRepository.findById(1L)).thenReturn(task);
        assertEquals(33L, taskService.changeUser(1L,33L).userId.longValue());
    }
    @Test
    public void testChangeStatus(){
        Task task = new Task();
        task.userId = 1L;
        task.taskStatusId = 2L;
        when(taskRepository.saveAndFlush(task)).thenReturn(task);
        when(taskRepository.findById(1L)).thenReturn(task);
        assertEquals(55L, taskService.changeStatus(1L,55L).taskStatusId.longValue());
    }



}