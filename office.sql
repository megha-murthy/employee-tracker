drop database if exists office;
create database office;
use office;

create table department(
id integer not null auto_increment,
primary key(id),
name varchar(30) not null unique
);
-- department_id -  INT to hold reference to department role belongs to

create table role(
id integer not null auto_increment,
primary key(id),
title varchar(30),
salary decimal(10,4) not null,
department_id integer(30) not null,
foreign key(department_id) references department(id) ON DELETE CASCADE
)ENGINE =INNODB;

create table employee(
id integer not null auto_increment ,
primary key(id),
first_name varchar(30) not null,
last_name varchar(30) not null,
role_id integer not null,
foreign key(role_id) references role(id) ON DELETE CASCADE,
manager_id integer(30),
foreign key(manager_id) references employee(id)ON DELETE CASCADE
)ENGINE =INNODB;

-- insert into role (title,salary,department_id) 
-- values(response.title,response.salary, (select id from department where name=response.deptName));

select * from role;

select * from employee;

select * from department;

INSERT into DEPARTMENT (name)
values ("Engineering"), ("Sales"), ("Finance"), ("Legal") ;

INSERT into ROLE (title, salary, department_id)
values("Sales Lead" , 15, 1), ("Salesperson", 9, 2), ("Lead Engineer", 150, 3), 
("Software Engineer", 16, 4), ("Accountant", 7, 1), ("Legal", 250000, 2),
("Lawyer", 190000, 3);

INSERT into EMPLOYEE (first_name, last_name, role_id, manager_id) 
values ("Anna", "Park", 1, NULL),("Rafa", "Kors", 2, 1), ("Bella", "Adams", 3, 1), 
("Sara", "Park", 4, 3), ("Felix", "Nadella", 5, NULL), ("David", "Court", 3, NULL), 
("Billy", "Joe", 4, NULL);


