package com.gucci.luminaries.model;

import javax.persistence.*;

import lombok.Data;

@Data
@Entity
@Table( name = "campaigns" )
public class campaigns {

    @Id
    @Column( name = "year_ran" )
    private Long year_ran;
    @Column( name = "isCurrent" )
    private boolean isCurrent;

    public campaigns( ){

    }//end default Constructor

    public long getYearRan( ) {
        return year_ran;
    }//end getter for year_ran

    public boolean getIsCurrent( ){
        return isCurrent;
    }//end getter for isCurrent

    public void setYearRan( long y ){
        year_ran = y;
    }//end setter for year_ran

    public void setIsCurrent( boolean i ){
        isCurrent = i;
    }//end setter for isCurrent
}//end model for campaign