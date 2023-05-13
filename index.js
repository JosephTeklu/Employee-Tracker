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
  choices:["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an eployee", "Update an employee role", "Exit"],
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
    database: 'classlist_db'
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
    else yellow();
  })
}

function init() {
  // call recur and get use's choice
  recur();
}

init();