package com.gucci.luminaries.repository;

import com.gucci.luminaries.model.*;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
public interface OrderRepository extends CrudRepository<orders, Long> {
	//Querying method called selectAll this method returns all entries in the orders table
	@Query( value = "select * from orders order by order_number;", nativeQuery = true )
	Iterable<orders> selectAll( );
	//countOrders is used to count the number of orders made in a given campaign
	@Query( value = "select count( order_number ) from orders o where o.camp = :camp", nativeQuery = true )
	int countOrders(Long camp);
	@Query( value = "select * from orders o where o.address = :address and o.camp = :camp", nativeQuery = true )
	Iterable<orders> findByAddress(String address, int camp);
	//getCamp is used to get all the orders that need to be delivered in a campaign
	@Query( value = "select * from orders o where o.camp = :camp and o.delivered = false order by o.order_number", nativeQuery = true )
	Iterable<orders> getCamp( int camp );
	//getSum is ued to get the total amount of in the paid column for a given campaign
	@Query( value = "select sum( o.paid )from orders o where o.camp = :camp", nativeQuery = true )
	long getSum( int camp );
	//getTotalCost is used to get the total amount in the total cost column for a given campagin
	@Query( value = "select sum( o.total_cost )from orders o where o.camp = :camp", nativeQuery = true )
	long getTotalCost( int camp );
	//getToBeDelivered is used to get all the orders that need to be delivered in a campaign
	@Query( value = "select * from orders o where o.camp = :camp and delivered = false order by order_number", nativeQuery = true )
	Iterable<orders> getToBeDelivered(int camp);
	//getDelivered is used to get all the orders that need to be delivered in a campaign
	@Query( value = "select * from orders o where o.camp = :camp and delivered = true order by order_number", nativeQuery = true )
	Iterable<orders> getDelivered(int camp);
	//getCampaign is used to get all the orders in a campaign
	@Query( value = "select * from orders o where o.camp = :camp order by order_number", nativeQuery = true )
	Iterable<orders> getCampaign(int camp);
	//getPrevious is used to get all orders made by a given user id
	@Query( value = "select * from orders o where o.user_id = :userId", nativeQuery = true )
	Iterable<orders> getPrevious(long userId);
	@Query( value = "select * from orders where paid < total_cost", nativeQuery =  true )
	Iterable<orders> getNotPaid( );
}