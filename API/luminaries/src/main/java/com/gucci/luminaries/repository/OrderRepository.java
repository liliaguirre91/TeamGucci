package com.gucci.luminaries.repository;

import java.util.Optional;

import com.gucci.luminaries.model.*;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
public interface OrderRepository extends CrudRepository<orders, Long> {
	//Querying method called selectAll this method returns all entries in the orders table
	@Query( value = "select * from orders;", nativeQuery = true )
	Iterable<orders> selectAll( );
	@Query( value = "select count( order_number ) from orders o where o.camp = camp", nativeQuery = true )
	int countOrders(Long camp);
	@Query( value = "select * from orders o where o.address = address and o.camp = camp", nativeQuery = true )
	Optional<orders> findByAddress(String address, int camp);
}