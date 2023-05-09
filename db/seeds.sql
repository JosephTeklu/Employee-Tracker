INSERT INTO department (id, name)
VALUES(001, "HR"),
      (002, "IT"),
      (003, "Accounting"),
      (004, "Front Desk"),
      (005, "Sales"),
      (006, "Customer Service");

INSERT INTO role (id, title, salary, department_id)
VALUES(001, "Sales Manager", 80000, 005),
      (002, "Accountant", 65000, 003),
      (003, "Techinican", 60000, 002),
      (004, "Front Desk Rep", 35000, 004),
      (005, "Customer Service Rep", 30000, 006),
      (006, "HR Manager", 59000, 001);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(001, "John", "Baldwin", 003, 002),
      (002, "Trace", "Martin", 003, NULL),
      (003, "Aaron", "Tanner", 006, NULL),
      (004, "Ryan", "King", 003, 004),
      (005, "Michael", "Gibson", 004, NULL),
      (006, "Biz", "Gebrekidan", 002, NULL),
      (007, "Evelyn", "Curran", 001, NULL),
      (008, "Kit", "Singh", 005, NULL),
      (009, "Jason", "DeLine", 004, 003),
      (010, "Tyler", "Smith", 004, 001),
      (011, "Kali", "Lott", 006, 006),
      (012, "Melody", "Tovar", 001, 005);