const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "password",
    database: "emp_trackerDB"
});

function askQuestion() {
    inquirer.prompt([
        {
            type: "list",
            name: "userChoice",
            message: "What would you like to do?",
            choices: [
                "View Department",
                "View Employees",
                "View Roles",
                "Add Department",
                "Add Employee",
                "Add Roles",
                "Done"
            ]
        }
    ]).then(function(answer){
        switch(answer.userChoice) {
            case "View Department":
                viewDepartment()
                break;
            case "View Employees":
                viewEmployees()
                break;
            case "View Roles":
                viewRoles()
                break;
            case "Add Department":
                addDepartment()
                break;   
            case "Add Employee":
                addEmployee()
                break;
            case "Add Roles":
                addRoles()
                break;           
            default:
                buildTeam()       
        }
    })
}

function viewDepartment() {
    connection.query("select * from department", function(err, res) {
        if (err) throw err
        console.table(res);
    })
}

function viewEmployees() {
    connection.query("select * from employee", function(err, res) {
        if (err) throw err
        console.table(res);
    })
}

function viewRoles() {
    connection.query("select * from role", function(err, res) {
        if (err) throw err
        console.table(res);
    })
}

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your new department name?"

        }
    ]).then(function(response) {
        connection.query("insert into department set ?", {department_name: response.name}, function(err, res) {
            if (err) throw err
            console.log("department_name");
        })
    })

}

askQuestion();