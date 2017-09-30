package com.intexsoft.malkevich.repository;

import com.intexsoft.malkevich.model.Task;
import com.intexsoft.malkevich.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Repository for {@link User}
 */
public interface TaskRepository extends JpaRepository<Task, Long> {

	List<Task> findAllByUserId(Long id);
	Task findById(Long id);
}
