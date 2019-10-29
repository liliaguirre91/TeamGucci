package com.gucci.luminaries.repository;

import com.gucci.luminaries.model.*;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
public interface OrderRepository extends CrudRepository<orders, Long> {
	//Querying method called selectAll this method returns all entries in the orders table
	@Query( value = "select * from orders;", nativeQuery = true )
	Iterable<orders> selectAll( );
}