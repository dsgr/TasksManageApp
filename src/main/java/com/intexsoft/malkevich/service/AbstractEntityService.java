package com.intexsoft.malkevich.service;

import java.util.List;

import com.intexsoft.malkevich.model.AbstractEntity;

public interface AbstractEntityService <T extends AbstractEntity> {
	void delete(long id);
	T save(T entity);
	T find(long id);
	List<T> findAll();
}
