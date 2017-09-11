package com.intexsoft.malkevich.model;

import javax.persistence.*;
import java.sql.Timestamp;
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
    public Timestamp dateStart;
    @Column(name = "date_end")
    public Timestamp dateEnd;
}
