//create manager card
//create intern card
//create engineer card

{/* <div class="card" style="width: 18rem">
            <div class="card-header">
                <h2 class="card-title"> ${manager.role}</h2>
                <h3 class="card-title><i class="fas fa-mug-hot mr-2></i>${manager.name}</h3>
            </div>
            <div class="card-body">
                <ul class="list-group">
                    <li class="list-group-item"> ID: ${manager.id} </li>
                    <li class="list-group-item"> Email:<a href="mailto:${manager.email}> ${manager.email}</a> </li>
                    <li clasw="list-group-item">Office number: ${manager.officeNumber} </li>
                </ul>
            </div>
        </div> */}

{/* <div class="card">
            <div class="card-header">
                <h2 class="card-title"> ${intern.name} </h2>
                <h3 class="card-title><i class="fas fa-mug-hot mr-2></i>${intern.role} </h3>
            </div>
            <div class="card-body">
                <ul class="list-group">
                    <li class="list-group-item"> ID: ${intern.id} </li>
                    <li class="list-group-item"> Email:<a href="mailto:${intern.email}> ${intern.email}</a> </li>
                    <li clasw="list-group-item">School: ${intern.school} </li>
                </ul>
            </div>
        </div> */}

{/* <div class="card">
            <div class="card-header">
                <h2 class="card-title"> ${engineer.name} </h2>
                <h3 class="card-title><i class="fas fa-mug-hot mr-2></i>${engineer.role} </h3>
            </div>
            <div class="card-body">
                <ul class="list-group">
                    <li class="list-group-item"> ID: ${engineer.id} </li>
                    <li class="list-group-item"> Email:<a href="mailto:${engineer.email}> ${engineer.email}</a> </li>
                    <li clasw="list-group-item">Github:<a href="http://www.github.com/${engineer.github} target="_blank">${engineer.github}</li>
                </ul>
            </div>
        </div> */}

function createManagerCard(manager) {
    return `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Name: ${manager.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted"> Role: ${manager.role}</h6>
                <p class="card-text">ID: ${manager.id}</p>
                <p class="card-text">Email:  <a href="mailto:${manager.email}" class="card-link">${manager.email}</a></p>
                <p class="card-text">Office number: ${manager.officeNumber} </p>
            </div>
        </div>
    `
}
function createInternCard(intern) {
    return `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Name: ${intern.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted"> Role: ${intern.role}</h6>
                <p class="card-text">ID: ${intern.id}</p>
                <p class="card-text">Email: <a href="mailto:${intern.email}" class="card-link">${intern.email}</a></p>
                <p class="card-text">School: ${intern.school} </p>
            </div>
        </div>
    `;
}
function createEngineerCard(engineer) {
    return `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Name: ${engineer.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted"> Role: ${engineer.role}</h6>
                <p class="card-text">ID: ${engineer.id}</p>
                <p class="card-text">Email:  <a href="mailto:${engineer.email}" class="card-link">${engineer.email}</a></p>
                <p class="card-text">Github: <a href="http://www.github.com/${engineer.github}" target="_blank">${engineer.github}</a></p>
            </div>
        </div>
    `
}

function renderHTML(teamProfiles) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">
        <title>Document</title>
        
    </head>
    <body>
        <div class="jumbotron jumbotron-fluid">
            <div class="container justify-content-center">
                <h1 class="display-4">Team Profile Generator</h1>
                <p class="lead">Here's your team:</p>
            </div>
        </div>
        <div class="container">
            
            <div class="row justify-content-center">
                <div class="col-sm-3">
                    ${teamProfiles.filter( employee => employee.getRole() === "Manager").map(manager => createManagerCard(manager))}
                </div>
                 <div class="col-3">
                    ${teamProfiles.filter( employee => employee.getRole() === "Intern").map(intern => createInternCard(intern))}
                </div>
                <div class="col-3">
                    ${teamProfiles.filter( employee => employee.getRole() === "Engineer").map(engineer => createEngineerCard(engineer))}
                </div>
            </div>
        </div>     
    </body>
    </html>
    `
}

module.exports = renderHTML;

