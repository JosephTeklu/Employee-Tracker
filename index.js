const inquirer = require('inquirer'); 
const mysql = require('mysql2');

// array for questions
const questions = 
[
  {type:"list",name:"choice", 
  choices:["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role", "Exit\n\n"],
  default: "View all departments"
  }
]

// array for holding department names
let depNames = ["HR", "IT", "Accounting", "Front Desk", "Sales", "Customer Service"];
// array for holding roles
let roles = ["Sales Manager", "Accountant", "Techinican", "Front Desk Rep", "Customer Service Rep", "HR Manager"];
// array for holding employee names
let empNames = ["John Baldwin", "Trace Martin", "Aaron Tanner", "Ryan King", "Michael Gibson", "Biz Gebrekidan", "Evelyn Curran", "Kit Herrington", "Jason DeLine", "Tyler Smith", "Kali Lott", "Melody Tovar"];

// HELLO ZIOIN AND DAD

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'joe',
    // MySQL password
    password: '',
    database: 'employee_tracker'
  },);

function recur(){

  // send inquirer the questions array
  inquirer.prompt(questions)
  .then(response =>{
    // if the choosen slection is exit then return false
    if(response.choice === "Exit") {console.log("Thank you for using Empoyee-Trcker Database."); return 0;}
    // if the choosen selection is not exit then return the user's choice
    else{return response.choice;}
  })
  .then(res => {
    // if the response is false return
    if(!res) {return;}

    // or else call this function agian to display the options from inquirer
    else{

      // switch case to handel response
      switch (res) {

        case "View all departments":
          // showing the department table
          db.query('SELECT * FROM department', (err, results) => {
            console.log("");
            // output table
            console.table(results);
            // call the recurscion to output the options again
            recur();
          });
          break;

        case "View all roles":
          // showing the roles table
          db.query('SELECT role.id, role.title,role.salary, department.name AS Department FROM role LEFT JOIN department ON department_id = department.id', (err, results) => {
            if(err){throw err}
            // output the departments
            console.log("");
            console.table(results);
            // call the recurscion to output the options again
          recur();
          });
          break;

        case "View all employees":
            // showing the roles table
            db.query('SELECT employee.first_name, employee.last_name, role.salary, role.title, department.name AS Department, manager.first_name AS manager FROM employee LEFT JOIN role ON role_id=role.id LEFT JOIN employee manager ON manager.id = employee.manager_id LEFT JOIN department ON role.department_id = department.id', (err, results) => {
              if(err) console.log(err);
              // output the departments
              console.log("");
              console.table(results);
              // call the recurscion to output the options again
              recur();
            });
          break;

        case "Add a department":
          // ask for the name of the new department
          inquirer.prompt([{type: "input", message: "What is the new of the new department?\n", name:"newDep"}])
          .then(response => {
            // add the new department to the db and call this function again
            db.query(`INSERT INTO department (name) VALUES('${response.newDep}')`, (err, results) => {
              if(err) console.log(err);
              // add new department into the array
              depNames.push(response.newDep)
              console.log("");
              console.log(`${response.newDep} has been added to the database.`)
              recur();
            });
          })
          break;

        case "Add a role":
            // ask questions for the new role
            inquirer.prompt([{type: "input", message: "What is the name of the new role?\n", name:"roleName"},
            {type:"input", message:"What is the salary for this role?", name:"salary"},
            {type:"list", message:"Which department will this role belonge to?", choices: depNames, name: "depChoice"}])
            .then(response => {
              // add the new role to the db and call this function again
              db.query(`INSERT INTO role (title, salary, department_id) VALUES('${response.roleName}',${response.salary}, ${depNames.indexOf(response.depChoice)+1})`, (err, results) => {
                if(err) console.log(err);
                // add role name to the roles array
                roles.push(response.roleName);
                console.log("");
                console.log(`${response.roleName} has been added to the database.`)
                recur();
              });
            })
          break;

        case "Add an employee":
          empNames.push("NO MANAGER");
          // ask question for new employee
          inquirer.prompt([{type: "input", message: "What is the employee's first name?", name: "firstN"},
                           {type: "input", message: "What is the employee's last name?", name: "lastN"},
                           {type: "list", message: "What is the employee's role?", choices:roles, name: "role"},
                           {type: "list", message:"Who is the employee's manager? If this employee is a manager select NO MANAGER", choices:empNames, name:"manager"}])
          .then(response => {
            // if the new employee does not have a manager 
            if(response.manager == "NO MANAGER"){
              // add the new employee to the db and call this function again
              db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES('${response.firstN}', '${response.lastN}', ${roles.indexOf(response.role)+1}, NULL)`, (err, results) => {
                if(err) console.log(err);
                // add the new name to the employees array
                empNames.push(response.firstN + " " + response.lastN);
                console.log(`${response.firstN} ${response.lastN} has been added to the database.`)
                recur();
              });
            }
            else{
              // add the new employee to the db and call this function again
              db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES('${response.firstN}', '${response.lastN}', ${roles.indexOf(response.role)+1}, ${empNames.indexOf(response.manager)})`, (err, results) => {
               empNames.push(response.firstN + " " + response.lastN);
               recur();
              });
            }
          })
          break;

        case "Update an employee role":
          inquirer.prompt([{type: "list", message: "Which employee's role do you want to update?", choices:empNames, name: "emp"},
                           {type: "list", message: "Which role do you want to assign the selected employee?", choices: roles, name:"newRole"}])
          .then(response =>{
            db.query(`UPDATE employee SET role_id=${roles.indexOf(response.newRole)+1} WHERE id=${empNames.indexOf(response.emp)}`, (err, results) => {
              if (err) console.log(err);
              console.log(`Updated ${response.emp}'s role to ${response.newRole}`);
              recur();
            });
          })
          break;

        case "Exit":
          console.log("Thank you for using Employee-Tracker Database!");
          return(0);
          break;

        default:
          console.log("Thank you for using Employee-Tracker Database!");
        break;
      }
    }
  })
}


recur();

