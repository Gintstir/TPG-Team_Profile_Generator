const inquirer = require("inquirer");
const fs = require('fs');

const Employee = require('./lib/Employee');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');
const renderHTML = require('./page-template');

let teamProfiles = []; // every time we create a new employee obj, push to this arr

function addManagerInfo() {
    console.log(`
        =====================================
        Welcome to the Team Profile Generator
        =====================================
        -Please follow the following prompts 
        to create profiles for your team members-
    `);
    inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'What is the name of the Team Manager?',
            validate: managerNameInput => {
                if(managerNameInput) {
                    return true;
                } else {
                    console.log('Please enter a name for the Team Manager e.g. "Jane Smith"');
                    return false;
                }
            }
        },
        {
            name: 'id',
            type: 'number',
            message: "What is the Team Manager's ID number?"            
        },
        {
            name: 'email',
            type: 'input',
            message: "What is the Team Manager's email address?",
            validate:managerEmailInput => {
                if(managerEmailInput) {
                    return true;
                } else {
                    console.log("Please enter an Email address for the Team Manager!");
                    return false;
                }
            }
        },
        {
            name: 'officeNumber',
            type: 'number',
            message: "What is the Manager's office number?"
        }        
    ])
    .then(function(data) {
        // const name = data.name;
        // const id = data.id;
        // const email = data.email;
        // const officeNumber = data.officeNumber;;
        const manager = new Manager(data.name, data.id, data.email, data.officeNumber);
        teamProfiles.push(manager)
        console.log(renderHTML(teamProfiles));
        fs.writeFile()

    })
}

function addMoreEmployees() {
    
}


addManagerInfo();