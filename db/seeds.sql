INSERT INTO department (name)
VALUES("HR"),
      ("IT"),
      ("Accounting"),
      ("Front Desk"),
      ("Sales"),
      ("Customer Service");

INSERT INTO role (title, salary, department_id)
VALUES("Sales Manager", 80000, 005),
      ("Accountant", 65000, 003),
      ("Techinican", 60000, 002),
      ("Front Desk Rep", 35000, 004),
      ("Customer Service Rep", 30000, 006),
      ("HR Manager", 59000, 001);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("John", "Baldwin", 003, 002),
      ("Trace", "Martin", 003, NULL),
      ("Aaron", "Tanner", 006, NULL),
      ("Ryan", "King", 003, 004),
      ("Michael", "Gibson", 004, NULL),
      ("Biz", "Gebrekidan", 002, NULL),
      ("Evelyn", "Curran", 001, NULL),
      ("Kit", "Herrington", 005, NULL),
      ("Jason", "DeLine", 004, 003),
      ("Tyler", "Smith", 004, 001),
      ("Kali", "Lott", 006, 006),
      ("Melody", "Tovar", 001, 005);

