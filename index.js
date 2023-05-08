const inquirer = require("inquirer");
const mysql = require('mysql2');
const consoleTable = require('console.table')

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '',
    database: 'classlist_db'
  },
  console.log(`Connected to the classlist_db database.`)
);