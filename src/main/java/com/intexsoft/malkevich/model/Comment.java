package com.intexsoft.malkevich.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.sql.Timestamp;

/**
 * Model for comments table
 */
@Entity
@Table(name = "comments")
public class Comment extends AbstractEntity {
    private static final long serialVersionUID = 4964642541416406667L;
    @Column
    public String message;
    @Column(name = "task_id")
    public Long taskId;
    @Column(name = "user_id")
    public Long userId;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd'T'HH:mm", timezone="UTC")
    public Timestamp date;
}
