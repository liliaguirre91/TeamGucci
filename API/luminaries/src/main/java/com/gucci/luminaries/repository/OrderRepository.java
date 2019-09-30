package com.gucci.luminaries.repository;

import java.util.List;

import com.gucci.luminaries.model.*;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
public interface OrderRepository extends CrudRepository<orders, Long> {
    List<orders> findByAddress( String address );
	//Querying method called selectAll this method returns all entries in the orers table
	@Query( value = "select * from orders;", nativeQuery = true )
	Iterable<orders> selectAll( );
}