const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const inquirer = require("inquirer");
const fs = require("fs");
let employees = [];

inquirer
    .prompt([
        {
            type: 'input',
            message: 'What is the team manager\'s name:',
            name: 'manager_name',
        },
        {
            type: 'input',
            message: 'What is the team manager\'s employee ID:',
            name: 'manager_id',
        },
        {
            type: 'input',
            message: 'What is the team manager\'s employee email address:',
            name: 'manager_email',
        },
        {
            type: 'input',
            message: 'What is the team manager\'s employee phone number:',
            name: 'manager_number',
        },
    ])
    .then((response) => {
        const name = response.manager_name;
        const id = response.manager_id;
        const email = response.manager_email;
        const officeNumber = response.manager_number;
        const manager = new Manager(name, id, email, officeNumber);
        employees.push(manager);
    }
    );

  // Create Engineer Employee Function
  // Create Intern Employee Function