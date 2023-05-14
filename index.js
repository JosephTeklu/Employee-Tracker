const express = require('express');
const inquirer = require('inquirer'); 
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// array for questions
const questions = 
[
  {type:"list",name:"choice", 
  choices:["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role", "Exit\n\n"],
  default: "View all departments"
  }
]

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
  },
  console.log(`Connected to the classlist_db database.`)
);

function recur(){
  // send inquirer the questions array
  inquirer.prompt(questions)
  .then(response =>{
    // if the choosen slection is exit then return false
    if(response.choice === "Exit") {return 0;}
    // if the choosen selection is not exit then return the user's choice
    else{return response.choice;}
  })
  .then(res => {
    // if the response is false return
    if(!res) {return;}

    // or else call this function agian to display the options from inquirer
    else{
      switch (res) {
        case "View all departments":
          // showing the department table
          db.query('SELECT * FROM department', (err, results) => {
            // output the departments
            console.log("");
            console.table(results);
            // call the recurscion to output the options again
            recur();
          });
          
          break;
        case "View all role":
          // showing the roles table
          db.query('SELECT * FROM roles', (err, results) => {
            // output the departments
            console.log("");
            console.table(results);
          });
          // call the recurscion to output the options again
          recur();
          break;
        case "View all employee":
            // showing the roles table
            db.query('SELECT * FROM employees', (err, results) => {
              // output the departments
              console.log("");
              console.table(results);
            });
            // call the recurscion to output the options again
            recur();
          break;
        case "Add a department":
          console.log("add department")
          break;
        case "Add a role":
          console.log("add role")
          break;
        case "Add an employee":
          console.log("add employee")
          break;
        case "Update an empoyee role":
          console.log("update e role")
          break;
        default:
          console.log("Thank you for using Employee-Tracker Database!")
        break;
      }

    }
  })
}


function init() {
  // call recur and get use's choice
  console.log(recur());

  //  deleting query
  // db.query(`DELETE FROM employee_tracker WHERE id = ?`, 3, (err, result) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   console.log(result);
  // });



}

init();