CREATE database ukada CHARACTER SET 'utf8' COLLATE 'utf8_general_ci';

CREATE USER 'ukada'@'localhost' IDENTIFIED BY 'ukada';
--GRANT privileges ON ukada.* TO 'ukada'@'localhost';

grant all privileges on ukada.* to ukada@localhost identified by 'ukada';

use ukada;
create table users (
	id int not null primary key auto_increment,
	email varchar(50) not null,
	password varchar(50) not null,
	statu int not null default '0',
	nick varchar(50),
    teamer1 varchar(50),
    teamer2 varchar(50),
    teamer3 varchar(50),
	school varchar(40),
	phone varchar(11),
	qq varchar(12)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- insert into users (email, password, statu, name) values ('xue@gmail.com', '123', 1, '徐莲辉')

