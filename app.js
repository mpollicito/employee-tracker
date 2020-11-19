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
    ]).then(function (answer) {
        switch (answer.userChoice) {
            case "View Department":
                viewData("select * from department")
                break;
            case "View Employees":
                viewData("select * from employee")
                break;
            case "View Roles":
                viewData("select * from role")
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
                console.log("Finished")
        }
    })
}

function viewData(sqlQuery) {
    connection.query(sqlQuery, function (err, res) {
        if (err) throw err
        console.log(res);
        askQuestion();
    })
}

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your new department name?"

        }
    ]).then(function (response) {
        connection.query("insert into department set ?", { department_name: response.name }, function (err, res) {
            if (err) throw err
            console.log("department_name");
            askQuestion();
        })
    })
}

function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is your new employee's first name?"

        },
        {
            type: "input",
            name: "lastName",
            message: "What is your new employee's last name?"

        },
        {
            type: "input",
            name: "roleID",
            message: "What is your new employee's role ID?"

        },
        {
            type: "input",
            name: "managerID",
            message: "What is your new employee's manager ID?"

        }
    ]).then(function (response) {
        connection.query("insert into employee set ?", 

            {
                first_name: response.firstName,
                last_name: response.lastName,
                role_id: response.roleID,
                manager_id: response.managerID
            },
            function (err, res) {
                if (err) throw err
                console.log(res.affectedRows + " employee inserted");
                askQuestion();
            })
    })
}

function addRoles() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What are your employee's roles ?"

        }
    ]).then(function (response) {
        connection.query("insert into employee's roles set ?", { roles_name: response.name }, function (err, res) {
            if (err) throw err
            console.log("roles_name");
            askQuestion();
        })
    })
}

askQuestion();