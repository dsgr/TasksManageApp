package com.intexsoft.malkevich.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;

import com.intexsoft.malkevich.model.AbstractEntity;
import com.intexsoft.malkevich.service.AbstractEntityService;

public class AbstractEntityServiceImpl <T extends AbstractEntity> implements AbstractEntityService<T> {
	@Autowired
	JpaRepository<T, Long> repository;
	
	public void delete(long id) {
		repository.delete(id);
	}

	public T save(T entity) {
		return repository.save(entity);
	}

	public T find(long id) {
		return repository.findOne(id);
	}

	public List<T> findAll() {
		return repository.findAll();
	}

}
