//create manager card

function createManagerCard(managerObj) {
    return `
        <div class="card">
            <div class="card-header">
                <h2 class="card-title"> ${managerObj.name} </h2>
                <h3 class="card-title><i class="fas fa-mug-hot mr-2></i>${managerObj.role} </h3>
            </div>
            <div class="card-body">
                <ul class="list-group">
                    <li class="list-group-item"> ID: ${managerObj.id} </li>
                    <li class="list-group-item"> Email:<a href="mailto:${managerObj.email}> ${managerObj.email}</a> </li>
                    <li clasw="list-group-item">Office number: ${managerObj.officeNumber} </li>
                </ul>
            </div>
        </div>
    `
}

function renderHTML(employees) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        
    </head>
    <body>
    ${employees.filter( employee => employee.getRole() === "Manager").map(manager => createManagerCard(manager))}
        
    </body>
    </html>
    `
}

module.exports = renderHTML;