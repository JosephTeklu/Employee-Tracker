DROP DATABASE IF EXISTS Employee_Tracker;
CREATE DATABASE employee_tracker;

USE Employee_Tracker;

CREATE TABLE department (
    id INT NOT NULL,
    name VARCHAR(30),
    -- make the id a primary key for the role table
    PRIMARY KEY (id)
);

CREATE TABLE role(
    id INT NOT NULL,
    PRIMARY KEY (id), -- make id a primary key for the employee table
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT, -- refrence to department role 

    -- specify that the (department_id) will come from a different table
    FOREIGN KEY(department_id)
    -- refrence the id property from the department table for the foriegn key
    REFERENCES department(id)
    -- if a department gets deletes what ever rol is using it will be set it to null
    ON DELETE SET NULL
);

CREATE TABLE employee(
    id INT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT, -- null if employee has no manager

    -- specify that the (id) will come from a different table
    FOREIGN KEY(role_id)
    -- refrence the id from the table role to use for the foriegn key
    REFERENCES role(id)
);