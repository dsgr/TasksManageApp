package com.intexsoft.malkevich.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

/**
 * Model for tasks table
 */
@Entity
@Table(name = "tasks")
public class Task extends AbstractEntity {
    private static final long serialVersionUID = 4964642541416406667L;
    @Column
    public String name;
    @Column
    public String description;
    @Column(name = "task_status_id")
    public Long taskStatusId;
    @Column(name = "user_id")
    public Long userId;
    @Column(name = "date_start")
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd'T'HH:mm", timezone="UTC")
    public Timestamp dateStart;
    @Column(name = "date_end")
    public Timestamp dateEnd;

    @Override
    public String toString() {
        return "Task{" +
                "name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", taskStatusId=" + taskStatusId +
                ", userId=" + userId +
                ", dateStart=" + dateStart +
                ", dateEnd=" + dateEnd +
                '}';
    }
}
