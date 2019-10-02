package com.gucci.luminaries.repository;

import java.util.Optional;
import com.gucci.luminaries.model.*;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
public interface ProductRepository extends CrudRepository<products, Long> {
    @Query( value = "select * from products p where p.product = :product", nativeQuery = true )
	Optional<products> findProduct( @Param( "product" ) String product);
	//Querying method called selectAll this method returns all entries in the orers table
	@Query( value = "select * from products;", nativeQuery = true )
	Iterable<products> selectAll( );
}