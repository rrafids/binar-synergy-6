create table users (
	id BIGSERIAL primary key,
	email varchar(30) not null,
	name varchar(30) not null,
	profile_picture_url text
)

create table tweets (
	id BIGSERIAL primary key,
	user_id bigint not null,
	content text not null
)

create table categories (
	id BIGSERIAL primary key,
	name varchar(30) not null
)

create table tweet_categories (
	id BIGSERIAL primary key,
	tweet_id bigint not null,
	category_id bigint not null,
)