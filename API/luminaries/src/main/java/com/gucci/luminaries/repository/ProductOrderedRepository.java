package com.gucci.luminaries.repository;

import java.util.Optional;

import com.gucci.luminaries.model.productOrdered;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
public interface ProductOrderedRepository extends CrudRepository<productOrdered, Long> {
	//Querying method called selectAll this method returns all entries in the productOrdered table
	@Query( value = "select * from product_ordered;", nativeQuery = true )
	Iterable<productOrdered> selectAll( );
	@Query( value = "select quantity from product_ordered where order_id = :orderId and product_id = :product", nativeQuery = true )
	Optional<Long> getQuantity( long orderId, long product );
}