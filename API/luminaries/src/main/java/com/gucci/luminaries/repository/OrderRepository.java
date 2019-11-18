package com.gucci.luminaries.repository;

import com.gucci.luminaries.model.*;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
public interface OrderRepository extends CrudRepository<orders, Long> {
	//Querying method called selectAll this method returns all entries in the orders table
	@Query( value = "select * from orders order by order_number;", nativeQuery = true )
	Iterable<orders> selectAll( );
	@Query( value = "select count( order_number ) from orders o where o.camp = :camp", nativeQuery = true )
	int countOrders(Long camp);
	@Query( value = "select * from orders o where o.address = :address and o.camp = :camp", nativeQuery = true )
	Iterable<orders> findByAddress(String address, int camp);
	@Query( value = "select * from orders o where o.camp = :camp order by o.order_number", nativeQuery = true )
	Iterable<orders> getCamp( int camp );
	@Query( value = "select sum( o.paid )from orders o where o.camp = :camp", nativeQuery = true )
	long getSum( int camp );
	@Query( value = "select * from orders o where o.camp = :camp and delivered = false order by order_number", nativeQuery = true )
	Iterable<orders> getToBeDelivered(int camp);
	@Query( value = "select * from orders o where o.camp = :camp and delivered = true order by order_number", nativeQuery = true )
	Iterable<orders> getDelivered(int camp);
	@Query( value = "select * from orders o where o.user_id = :userId", nativeQuery = true )
	Iterable<orders> getPrevious(long userId);
}