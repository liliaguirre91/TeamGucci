To connect to database create an ssh tunnel with command
ssh -L 9090:dbclass.cs.nmsu.edu:5432 "yourusername"@shamir.cs.nmsu.edu
Run the code and all entries in a table can be found at localhost:5555/api/{Table Name}
Query name at /users/search/{name} 
Query name and email at /users/search/{name}/{email}
To run any mapping other than get it is best to run in PostMan
All commented code currently works

Current Database Schemas

create table users( 
user_id SERIAL PRIMARY KEY,
email varchar( 40 ) not null,
name varchar( 40 ) not null,
camp integer,
comments varchar( 200 ),
address varchar( 100 )
role varchar( 255 ),
creates_at timestamp without time zone),
foreign key( camp ) references campaigns( year_ran ) );  

create table orders(
order_number SERIAL PRIMARY KEY,
delivered boolean,
address varchar( 100 ) not null,
camp numeric( 2, 0 ) not null,
payment_type varchar( 10 ) not null,
user_id integer,
phone_number varchar( 14 ),
creates_at timestamp without time zone),
name varchar( 20 ),
paid integer,
total_cost integer,
foreign key( user_id ) references users( user_id ) on delete set null,
foreign key( camp ) references campaigns( year_ran ));

create table products(
product_id SERIAL PRIMARY KEY,
product  varchar( 20 ) not null,
price numeric( 2, 0 ) not null,
year_ran integer not null,
image bytea,
description varchar( 255 ),
foreign key( camp ) references campaigns( year_ran ));

create table campaigns(
year_ran integer,
is_current boolean not null,
primary key( year_ran ) );

create table product_ordered( 
order_id integer,
product_id integer,
quantity integer,
foreign key( order_id ) references orders( order_number ) on delete CASCADE,
foreign key( product_id ) references products( product_id ) on delete CASCADE,
primary key( order_id, product_id ) );
