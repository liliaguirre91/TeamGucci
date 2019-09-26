package com.gucci.luminaries.repository;

import java.util.List;

import com.gucci.luminaries.model.*;
import org.springframework.data.repository.CrudRepository;
public interface UserRepository extends CrudRepository<users, String> {
    List<users> findByEmail( String email );
	List<users> findAll();
	users findByName(String string);
}