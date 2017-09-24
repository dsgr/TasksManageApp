package com.intexsoft.malkevich.service;

import com.intexsoft.malkevich.model.Task;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service for {@link com.intexsoft.malkevich.model.Task}
 */
public interface TaskService {

	List<Task> findAll();

	Task findByUserId(Long userId);

	@Transactional
	Task save(Task task);
	@Transactional
	Task add(Task task);
	@Transactional
	void deleteAll();
	@Transactional
	void deleteById(Long taskId);
	@Transactional
	Task update(Task task);

}
