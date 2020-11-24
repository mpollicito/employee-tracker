USE emp_trackerDB;
INSERT INTO department(department_name)
VALUES ("sales"), ("hr"), ("finance"), ("management"), ("payroll");

INSERT INTO role(title, salary, department_id)
VALUES ("sales", 50000.00, 123), ("hr", 1000000.00, 124), ("management", 100000.00, 125);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("first_name", "last_name", 001, 100), ("first_name", "last_name", 002, 200), ("first_name", "last_name", 003, 300);