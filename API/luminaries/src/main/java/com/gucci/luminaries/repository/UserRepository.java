package com.gucci.luminaries.repository;

//import java.util.List;
import java.util.Optional;

import com.gucci.luminaries.model.*;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

//Interface for the user
//It extends crud repository to get basic functions of
//a restful repository
public interface UserRepository extends CrudRepository<users, Long> {
	//Querying method called selectUser this method takes a name and email and querries the database for an entry
	//in the users table with those components
	@Query( value = "select * from users u where u.name = :name and u.email = :email", nativeQuery = true )
	Optional<users> selectUser( @Param( "name" ) String name, @Param( "email" ) String email );
	//Querying method called selectAll this method returns all entries in the users table
	@Query( value = "select * from users order by user_id;", nativeQuery = true )
	Iterable<users> selectAll( );
	//Querying method called selectName this method takes a name and querries the database for an entry
	//in the users tablewith that component
	@Query( value = "select * from users u where u.name = :name", nativeQuery = true )
	Optional<users> selectName(String name);
	@Query( value = "select * from users u where u.email = :email", nativeQuery = true )
	Optional<users> checkEmail( String email );

	//made by Lucas for auth
	//Some of these might be redundant

	//finds the user by username or email to allow users to enter either to log in
	@Query( value = "select * from users u where u.username = :username or u.email = :email", nativeQuery = true)
	Optional<users> findByUsernameOrEmail(String username, String email);
	
}