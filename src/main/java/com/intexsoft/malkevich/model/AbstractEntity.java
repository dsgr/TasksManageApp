package com.intexsoft.malkevich.model;

import javax.persistence.MappedSuperclass;

import org.springframework.data.jpa.domain.AbstractPersistable;

/**
 * Abstract entity class with similar for all entities behavior.
 */
@MappedSuperclass
public class AbstractEntity extends AbstractPersistable<Long> {
	private static final long serialVersionUID = 6994150713981540980L;
	//@Column(columnDefinition = "boolean default false", nullable = false)
	//public boolean deleted;
}
