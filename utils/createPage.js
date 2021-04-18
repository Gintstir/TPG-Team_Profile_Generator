const fs = require('fs');


const createPage = (pageTemplate) => {  
    fs.writeFile("./dist/teamProfile.html", pageTemplate, (err) => {        
      if (err) {        
        console.log(err);        
      }
      console.log('page created!')             
      });  
};


module.exports = createPage;