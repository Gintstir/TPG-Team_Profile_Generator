const inquirer = require("inquirer");

const renderHTML = require('./src/page-template');

const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');



//separating concerns- use writeFile function in utils folder to teamProfiles array to page-template.js 
const createPage = require('./utils/createPage');

// every time we create a new employee obj, push to this arr
let teamProfiles = []; 


//manager prompts that get pushed to teamProfiles[]
const addManager = () => {

    console.log(`
    //         =====================================         //
    //         Welcome to the Team Profile Generator         //
    //         =====================================         //
    //         ------Please follow the prompts------         //
    //        to create profiles for your team members       //
    //              Let's start with a manager!              // 
    `)
    
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
            message: "What is the Team Manager's office number?"
        }        
    ])
    .then((response) => {
        
        
        const manager = new Manager(response.name, response.id, response.email, response.role, response.officeNumber);
        manager.role= "Manager"
        teamProfiles.push(manager)        
        console.log(manager)
        keepAddingEmployees();
    })
}
//If user confirms 'y' to keep adding more employees, they will choose which employee they want to add.  If 'n' then render profiles.
const addMoreEmployees = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: "Would like to add another member to your team?",
            choices: [
                "I would like to add another Manager",
                "I would like to add an Intern!",
                "I would like to add an Engineer!",
                
                
            ],
            name: "addOne"
        }
    ])
    .then((response) => {
        if(response.addOne === "I would like to add another Manager!") {
            addManager()
        }
        if(response.addOne === "I would like to add an Intern!") {
            addIntern();
        }
        if(response.addOne === "I would like to add an Engineer!"){
            addEngineer();
        }        
    });
};

//Intern prompts that get pushed to teamProfiles array
const addIntern = () => {
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
    .then((response) => {
        
        const intern = new Intern(response.name, response.id, response.email, response.role, response.school)
        intern.role = "Intern"
        teamProfiles.push(intern)
        console.log(intern)
        keepAddingEmployees();        
    });
};

//Engineer prompts that get pushed to teamProfiles array
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
    .then((response) => {
        
        const engineer = new Engineer(response.name, response.id, response.email, response.role, response.github)
        engineer.role = "Engineer"
        teamProfiles.push(engineer)
        console.log(engineer);
        keepAddingEmployees();
    });
};

//This prompts user if they want to keep adding profiles, if 'y' trigger addMoreEmployees(), if 'n' render profiles. 
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
            console.log(`
            =================
            Here is you team:
            =================
            `,teamProfiles);
            
            let profilePage = renderHTML(teamProfiles);

            createPage(profilePage)
            .then((resolvePromise) => {
                console.log(resolvePromise);            
            })            
        }
    })
         
}



addManager();



    