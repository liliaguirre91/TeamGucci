package com.gucci.lumiaries.repository;

import java.util.List;

import com.gucci.lumiaries.model.*;
import org.springframework.data.repository.CrudRepository;
public interface OrderRepository extends CrudRepository<orders, String> {
    List<orders> findByAddress( String address );
	List<orders> findAll();
}