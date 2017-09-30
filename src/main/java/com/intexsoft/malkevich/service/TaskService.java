package com.intexsoft.malkevich.service;

import com.intexsoft.malkevich.model.Task;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service for {@link com.intexsoft.malkevich.model.Task}
 */
public interface TaskService {

	List<Task> findAll();

	List<Task> findByUserId(Long userId);

	@Transactional
	Task save(Task task);
	@Transactional
	Task add(Task task);
	@Transactional
	void deleteAll();
	@Transactional
	void deleteById(Long taskId);
	@Transactional
	Task changeUser(Long taskId, Long userId);
	@Transactional
	Task changeStatus(Long taskId, Long userId);
	@Transactional
	Task update(Task task);

}
