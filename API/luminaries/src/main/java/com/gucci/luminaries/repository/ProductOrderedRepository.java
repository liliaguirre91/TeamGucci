package com.gucci.luminaries.repository;

import com.gucci.luminaries.model.productOrdered;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
public interface ProductOrderedRepository extends CrudRepository<productOrdered, Long> {
	//Querying method called selectAll this method returns all entries in the productOrdered table
	@Query( value = "select * from product_ordered;", nativeQuery = true )
	Iterable<productOrdered> selectAll( );
}