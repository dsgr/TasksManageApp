package com.intexsoft.malkevich.service;

import com.intexsoft.malkevich.model.Comment;
import com.intexsoft.malkevich.model.Task;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service for {@link com.intexsoft.malkevich.model.Comment}
 */
public interface CommentService {
	/**
	 * Find all tasks, assign to user
	 */
	@Transactional
	List<Comment> findByTaskId(Long userId);

	/**
	 * Add new comment
	 */
	@Transactional
	Comment add(Comment comment);
}
