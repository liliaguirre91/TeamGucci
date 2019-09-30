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
levels numeric( 1, 0 ) not null,
comments varchar( 200 ),
address varchar( 100 ) );  

create table orders(
order_number SERIAL PRIMARY KEY,
delivered boolean,
address varchar( 100 ) not null,
product varchar( 20 ) not null,
camp numeric( 2, 0 ) not null,
payment_type varchar( 10 ) not null,
user_id integer,
foreign key( user_id ) references users( user_id ) on delete set null );

create table products(
product  varchar( 20 ) not null,
price numeric( 2, 0 ) not null,
year_ran numeric( 2, 0 ) not null,
primary key( product, year_ran ));