package com.intexsoft.malkevich.service.impl;

import com.intexsoft.malkevich.model.Comment;
import com.intexsoft.malkevich.model.Task;
import com.intexsoft.malkevich.repository.CommentRepository;
import com.intexsoft.malkevich.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {
    private CommentRepository commentRepository;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @Override
    public List<Comment> findByTaskId(Long taskId) {
        return commentRepository.findAllByTaskId(taskId);
    }

    @Override
    public Comment add(Comment comment) {
        return commentRepository.saveAndFlush(comment);
    }
}
