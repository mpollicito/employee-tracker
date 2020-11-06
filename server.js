const inquirer = require("inquirer");
const app = inquirer();
const PORT = process.env.PORT || 3000;
app.use(inquirer.json());
app.use(inquirer.urlencoded({ extended: true }));
app.use(inquirer.static("public"));
// Start the server on the port
app.listen(PORT, () => console.log('Listening on localhost:' + PORT));