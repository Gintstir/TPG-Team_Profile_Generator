const inquirer = require("inquirer");
const fs = require('fs');

const Employee = require('./lib/Employee');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');

const renderHTML = require('./src/page-template');

let teamProfiles = []; // every time we create a new employee obj, push to this arr

function profileBuilder() {
    console.log(`
        =====================================
        Welcome to the Team Profile Generator
        =====================================
        -Please follow the following prompts 
        to create profiles for your team members-`)
    inquirer.prompt([
        {
            message: "We will begin by adding you team's manager",
            name: "yourTeam"
        }
    ])
    .then(function(data){
        const yourTeam = data.yourTeam
        teamProfiles.push(yourTeam)
        addManagerInfo();
    })
}



//manager prompts that get pushed to teamProfiles[]
const addManagerInfo = () => {
    
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
    .then((data) => {
        
        manager.role= "Manager"
        const manager = new Manager(data.name, data.id, data.email, response.role, data.officeNumber);
        teamProfiles.push(manager)
        //console.log(renderHTML(teamProfiles));
        //fs.writeFile()
        addMoreEmployees();
    })
}

const addMoreEmployees = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: "Would like to add another member to your team?",
            choices: [
                "I would like to add an Intern!",
                "I would like to add an Engineer!",
                "I am all done adding team members!"
            ],
            name: "addTeamMember"
        }
    ])
    .then(function(data){
        switch (data.addTeamMember) {
            case "I would like to add an Intern!":
                addIntern();
                break;
            case "I would like to add an Engineer!":
                addEngineer();
                break;
            case "I'm all done, please show me my team!":
                generateTeam();
                break;
        }
    });
}

function addIntern() {
    inquirer.prompt([
        {
            message: "What is your intern's name?",
            name: "name"
        },
        {
            message: "What is your intern's email address?",
            name: "email"
        },
        {
            message: "What school does your intern attend?",
            name: "school"
        }
    ])
    .then(function(data) {
        const name = data.name
        const id = teamProfiles.length + 1
        const email = data.email
        const school = data.school
        const teamMember = new Intern(name, id, email, school)
        teamProfiles.push(teamMember)
        addMoreEmployees();        
    });
};


function addEngineer() {
    inquirer.prompt([
        {
            message: "What is your engineer's name?",
            name: "name"
        },
        {
            message: "What is your Engineer's email address?",
            name: "email"
        },
        {
            message: "Please add a link to your engineer's github profile:",
            name: "github"
        }
    ])
    .then(function(data){
        const name = data.name
        const id = teamProfiles.length + 1
        const email = data.email
        const github = data.github
        const teamMember = new Engineer(name, id, email, github)
        teamProfiles.push(teamMember)
        addMoreEmployees();
    });
};

function generateTeam() {
    
    console.log(teamProfiles);
    fs.writeFile('./dist/newProfile.html', renderHTML(teamProfiles), err => {
        if(err) {
            console.log(err);
            return;
        } else {
            console.log(`
    =====================================
         Team Profile Generated!
    =====================================
            `)
        }        
    })
}

profileBuilder();
    