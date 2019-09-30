create table users(                                               
user_id SERIAL PRIMARY KEY,
email varchar( 40 ) not null,
name varchar( 40 ) not null,
levels numeric( 1, 0 ) not null,
comments varchar( 200 )
);

create table orders(                                              
order_number SERIAL PRIMARY KEY,
delivered boolean,
address varchar( 100 ) not null,
product varchar( 20 ) not null,
camp numeric( 2, 0 ) not null,
payment_type varchar( 10 ) not null,
user_id integer,
foreign key( user_id ) references users( user_id ) on delete set null );
insert into users( user_id, email, name, levels, campaigns ) values( 1,'cba@abc.com', 'jim', 2, 19 );
insert into users( user_id, email, name, levels ) values( 2,'bac@cab.com', 'jack', 1 );
insert into users( user_id, email, name, levels ) values( 3, 'cab@bac.com', 'john', 0 );
select * from users;
