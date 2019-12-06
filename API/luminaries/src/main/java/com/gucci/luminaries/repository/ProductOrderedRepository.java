package com.gucci.luminaries.repository;

import java.util.Optional;

import com.gucci.luminaries.model.productOrdered;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
public interface ProductOrderedRepository extends CrudRepository<productOrdered, Long> {
	//Querying method called selectAll this method returns all entries in the productOrdered table
	@Query( value = "select * from product_ordered;", nativeQuery = true )
	Iterable<productOrdered> selectAll( );
	//getQuantity is used to get the quantity of a specific product made in by an order
	@Query( value = "select quantity from product_ordered where order_id = :orderId and product_id = :product", nativeQuery = true )
	Optional<Long> getQuantity( long orderId, long product );
	//getSumQuantity is used to get the total number of a product that have been ordered
	@Query( value = "select sum( p.quantity ) from product_ordered p where p.product_id = :product", nativeQuery = true )
	Long getSumQuantity(  long product );
	//getOrder is used to get all product ordered entried for a given order id
	@Query( value = "select * from product_ordered p where p.order_id = :id", nativeQuery = true )
	Iterable<productOrdered> getOrder( long id );
}