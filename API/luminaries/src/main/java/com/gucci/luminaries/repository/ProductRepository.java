package com.gucci.luminaries.repository;

import java.util.Optional;
import com.gucci.luminaries.model.*;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
public interface ProductRepository extends CrudRepository<products, Long> {
    @Query( value = "select * from products p where p.product = :product", nativeQuery = true )
	Optional<products> findProduct( @Param( "product" ) String product);
	//Querying method called selectAll this method returns all entries in the products table
	@Query( value = "select * from products;", nativeQuery = true )
	Iterable<products> selectAll( );
	//Query for Products page to only show products in current campaign
	@Query( value = "select * from products p where p.year_ran = :year_ran", nativeQuery = true )
	Iterable<products> selectProductFor( @Param( "year_ran" ) int year_ran );
	@Query( value = "select p.price from products p where p.product_id = :id", nativeQuery = true )
	int getPrice( @Param( "id" ) long id );
}