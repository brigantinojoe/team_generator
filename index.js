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
                employeeOptions();
            } else {
                writeFile();
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
                message: 'What is the engineer\'s GitHub username:',
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
            createAnother();
        }
        );
};

// Create Function to pull HTML template content as a string and pass through each employee object to create cards and write file.
const writeFile = function () {
    const cardArray = [];
    let cardTemplate = "";
    const readStart = fs.readFileSync("./src/template.html");
    const readEnd = fs.readFileSync("./src/template_end.html");
    const templateStart = readStart.toString();
    const templateEnd = readEnd.toString();

    for (let i = 0; i < employees.length; i++) {
        const element = employees[i];
        const name = element.name;
        const id = element.id;
        const email = `<a href="mailto:${element.email}">${element.email}</a>`;
        if (element instanceof Manager) {
            var third_field = `Office Number: ${element.officeNumber}`;
            var type = "Manager";
        };
        if (element instanceof Engineer) {
            var third_field = `GitHub: <a href="https://github.com/${element.github}/" target="_blank" rel="noopener noreferrer">${element.github}</a>`;
            var type = "Engineer";
        };
        if (element instanceof Intern) {
            var third_field = `School: ${element.school}`;
            var type = "Intern";
        };
        const employeeCard = `
            <div class="card col-md-4 p-0" style="width: 18rem;">
                <div class="card-body col bg-secondary">
                    <header class="bg-dark text-light col justify-content-between y-4">
                        <p class="m-0 p-2" style="font-size: 20px; font-weight:bold;">${name}</p>
                        <p class="m-0 p-2" style="font-size: 20px; font-weight:bold;">${type}</p>
                    </header>
                    <section>
                        <div class="card" style="width: 100%;">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Employee ID: ${id}</li>
                                <li class="list-group-item">Employee Email: ${email}</li>
                                <li class="list-group-item">${third_field}</li>
                            </ul>
                        </div>
                    </section>
                </div>
            </div>`;
        cardTemplate += employeeCard;
    }


    var finalTemplate = templateStart + cardTemplate + templateEnd;

    fs.writeFile('./dist/index.html', finalTemplate, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });

};