const inquirer = require("inquirer");
const app = inquirer();

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

app.use(inquirer.json());
app.use(inquirer.urlencoded({ extended: true }));
app.use(inquirer.static("public"));
app.use(connection);

// Start the server on the port
app.listen(PORT, () => console.log('Listening on localhost:' + PORT));