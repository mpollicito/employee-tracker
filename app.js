const inquirer = require("inquirer");
const app = inquirer();
const path = require("path");
const fs = require("fs");

const connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "",
    database: "emp_trackerDB"
});

function askQuestion() {
    inquirer.prompt([
        {
            type: "list",
            name: "userChoice",
            message: "What type of employee do you want to add?",
            choices: [
                "Engineer",
                "Intern",
                "Manager",
                "Done"
            ]
        }
    ]).then(function(answer){
        switch(answer.userChoice) {
            case "Engineer":
                addEngineer()
                break;
            case "Intern":
                addIntern()
                break;
            case "Manager":
                addManager()
                break;  
            default:
                buildTeam()       
        }
    })
}

app.use(inquirer.json());
app.use(inquirer.urlencoded({ extended: true }));
app.use(inquirer.static("public"));
app.use(connection);
askQuestion();

// Start the server on the port
app.listen(PORT, () => console.log('Listening on localhost:' + PORT));