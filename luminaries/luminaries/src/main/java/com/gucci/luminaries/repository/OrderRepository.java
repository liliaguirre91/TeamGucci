package com.gucci.luminaries.repository;

import java.util.List;

import com.gucci.luminaries.model.*;
import org.springframework.data.repository.CrudRepository;
public interface OrderRepository extends CrudRepository<orders, String> {
    List<orders> findByAddress( String address );
	List<orders> findAll();
}