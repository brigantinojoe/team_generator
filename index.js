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
        employeeOptions();
    }
    );

// Create option function to determine whether another employee will be added.
const createAnother = function () {
    const choices = ["Yes, I'd like to create another Employee.", "No, I'd like to exit the application and see my results."];
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'Would you like to add another employee?',
                name: "options",
                choices: choices,
            }
        ])
        .then((response) => {
            if (response.options === choices[0]) {
                console.log("Lets create another");
                employeeOptions();
            } else { 
                // TODO: Run function that will create the html and/or css files. Use employees array to loop through objects and create cards.
                return console.log(employees) 
            }
        }
        );
};

// Create option function to determine whether the next employee will be an Engineer or an Intern.
const employeeOptions = function () {
    const choices = ["Engineer", "Intern"];
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'Which type of Employee would you like to add?',
                name: "options",
                choices: choices,
            }
        ])
        .then((response) => {
            if (response.options === choices[0]) {
                createEngineer();
            } else { createIntern(); }
        }
        );
};

// Create Engineer Employee Function
const createEngineer = function () {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the engineer\'s name:',
                name: 'engineer_name',
            },
            {
                type: 'input',
                message: 'What is the engineer\'s employee ID:',
                name: 'engineer_id',
            },
            {
                type: 'input',
                message: 'What is the engineer\'s employee email address:',
                name: 'engineer_email',
            },
            {
                type: 'input',
                message: 'What is the engineer\'s GitHub username',
                name: 'engineer_github',
            },
        ])
        .then((response) => {
            const name = response.engineer_name;
            const id = response.engineer_id;
            const email = response.engineer_email;
            const github = response.engineer_github;
            const engineer = new Engineer(name, id, email, github);
            employees.push(engineer);
            console.log(employees);
            createAnother();
        }
        );
};

// Create Intern Employee Function
const createIntern = function () {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the team intern\'s name:',
                name: 'intern_name',
            },
            {
                type: 'input',
                message: 'What is the team intern\'s employee ID:',
                name: 'intern_id',
            },
            {
                type: 'input',
                message: 'What is the team intern\'s employee email address:',
                name: 'intern_email',
            },
            {
                type: 'input',
                message: 'What is the team intern\'s school:',
                name: 'intern_school',
            },
        ])
        .then((response) => {
            const name = response.intern_name;
            const id = response.intern_id;
            const email = response.intern_email;
            const school = response.intern_school;
            const intern = new Intern(name, id, email, school);
            employees.push(intern);
            console.log(employees);
            createAnother();
        }
        );
};