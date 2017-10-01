package com.intexsoft.malkevich.service;

import com.intexsoft.malkevich.model.Comment;
import com.intexsoft.malkevich.model.Task;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service for {@link com.intexsoft.malkevich.model.Comment}
 */
public interface CommentService {

	@Transactional
	List<Comment> findByTaskId(Long userId);
	@Transactional
	Comment add(Comment comment);
}
