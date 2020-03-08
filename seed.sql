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
