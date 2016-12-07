

CREATE USER 'ukada'@'localhost' IDENTIFIED BY 'ukada';
GRANT privileges ON ukada.* TO ukada@localhost by 'ukada';

grant all privileges on ukada.* to ukada@localhost identified by 'ukada';
create table users (
	id int not null primary key auto_increment,
	email varchar(20) not null,
	password varchar(50) not null,
	statu int not null default '0',
	name varchar(20),
	nick varchar(10),
	studentID varchar(10),
	college varchar(40),
	phone varchar(11),
	qq varchar(12)
);