const inquirer = require("inquirer");
const fs = require('fs');

const Employee = require('./lib/Employee');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');

const renderHTML = require('./src/page-template');

const writeFile = require('./utils/writeFile');

let teamProfiles = []; // every time we create a new employee obj, push to this arr

// function profileBuilder() {
//     console.log(`
//         =====================================
//         Welcome to the Team Profile Generator
//         =====================================
//         -Please follow the following prompts 
//         to create profiles for your team members-`)
//     inquirer.prompt([
//         {
//             message: "We will begin by adding you team's manager",
//             name: "yourTeam"
//         }
//     ])
//     .then(function(data){
//         const yourTeam = data.yourTeam
//         teamProfiles.push(yourTeam)
//         addManagerInfo();
//     })
// }



//manager prompts that get pushed to teamProfiles[]
const addManager = () => {
    
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
            type: 'input',
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
            type: 'input',
            message: "What is the Manager's office number?"
        }        
    ])
    .then((answer) => {
        
        
        const manager = new Manager(answer.name, answer.id, answer.email, answer.role, answer.officeNumber);
        manager.role= "Manager"
        teamProfiles.push(manager)
        //console.log(renderHTML(teamProfiles));
        //fs.writeFile()
        console.log(manager)
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
                
            ],
            name: "addOne"
        }
    ])
    .then((profilePick) => {
        if(profilePick.addOne === "I would like to add an Intern!") {
            addIntern(profilePick);
        }
        if(profilePick.addOne === "I would like to add an Engineer!"){
            addEngineer(profilePick)
        }


        // switch (answer.addOrStop) {
        //     case "I would like to add an Intern!":
        //         addIntern();
        //         break;
        //     case "I would like to add an Engineer!":
        //         addEngineer();
        //         break;
            // case "I'm all done, please show me my team!":
            //     generateTeam();
            //     break;
        
    });
};

const addIntern = (profilePick) => {
    inquirer.prompt([
        {
            type: "input",
            message: "What is your intern's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is your intern's ID number?",
            name: "id"
        },
        {
            type: "input",
            message: "What is your intern's email address?",
            name: "email"
        },
        {
            type: "input",            
            message: "What school does your intern attend?",
            name: "school"
        }
    ])
    .then((answer) => {
        
        const intern = new Intern(answer.name, answer.id, answer.email, answer.school)
        intern.role = "Intern"
        teamProfiles.push(intern)
        console.log(intern)
        keepAddingEmployees();        
    });
};


const addEngineer = () => {
    inquirer.prompt([
        {
            message: "What is your engineer's name?",
            name: "name"
        },
        {
            message: "What is your engineer's ID number?",
            name: "id"
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
    .then((answer) => {
        
        const engineer = new Engineer(answer.name, answer.id, answer.email, answer.role, answer.github)
        engineer.role = "Engineer"
        teamProfiles.push(engineer)
        console.log(engineer);
        keepAddingEmployees();
    });
};


const keepAddingEmployees = () => {
    inquirer.prompt([
        {
            type: "confirm",
            name: "confirmKeepAddingEmployees",
            message: "Do you want to keep adding Employees?",

        },
    ])
    .then((answer) => {
        if(answer.confirmKeepAddingEmployees) {
            addMoreEmployees(teamProfiles);
        }
        if(!answer.confirmKeepAddingEmployees) {
            console.log(teamProfiles);
            let pageHtml = renderHTML(teamProfiles);
            writeFile(pageHtml)
            .then((writeFileResponse) => {
                console.log(writeFileResponse);
                return copyFile();
              })
              .then((copyFileResponse) => {
                console.log(copyFileResponse);
              });
        }
    })
}

addManager();

// const generateTeam = () => {
    
//     //console.log(teamProfiles);
    
//     fs.writeFile('index.html', renderHtml(teamProfiles), err => {
//         if(err) {
//             console.log(err);
//             return;
//         }                
//     })
    
//     console.log(` 
//     =====================================
//        Team Profile Generated!
//     =====================================
//        `)
// }

// //profileBuilder();

    