package com.intexsoft.malkevich.repository;

import com.intexsoft.malkevich.model.Comment;
import com.intexsoft.malkevich.model.Task;
import com.intexsoft.malkevich.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Repository for {@link Comment}
 */
public interface CommentRepository extends JpaRepository<Comment, Long> {

	List<Comment> findAllByTaskId(Long id);
	Comment findById(Long id);
}
