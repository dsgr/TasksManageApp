package com.intexsoft.malkevich.repository;

import com.intexsoft.malkevich.model.Task;
import com.intexsoft.malkevich.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository for {@link User}
 */
public interface TaskRepository extends JpaRepository<Task, Long> {

	Task findByUserId(Long userId);
}
