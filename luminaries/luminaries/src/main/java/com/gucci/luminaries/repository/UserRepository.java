package com.gucci.luminaries.repository;

import java.util.List;
import java.util.Optional;

import com.gucci.luminaries.model.*;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
public interface UserRepository extends CrudRepository<users, Long> {
	List<users> findByEmail( String email );
	List<users> findAll();
	users findByName(String string);
	@Query( value = "select * from users u where u.name = :name and u.email = :email", nativeQuery = true )
	Optional<users> selectUser( @Param( "name" ) String name, @Param( "email" ) String email );
	@Query( value = "select * from users;", nativeQuery = true )
	Iterable<users> selectAll( );
	@Query( value = "select * from users u where u.name = :name", nativeQuery = true )
	Optional<users> selectName(String name);
	
}