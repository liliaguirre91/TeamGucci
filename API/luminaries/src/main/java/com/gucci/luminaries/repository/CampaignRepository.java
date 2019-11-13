package com.gucci.luminaries.repository;

import com.gucci.luminaries.model.*;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
public interface CampaignRepository extends CrudRepository<campaigns, Long> {
	//Querying method called selectAll this method returns all entries in the campaigns table
	@Query( value = "select * from campaigns;", nativeQuery = true )
	Iterable<campaigns> selectAll( );
	@Query( value = "select year_ran from campaigns where is_current = true", nativeQuery = true )
	Long getCurrent();
}