const fs = require('fs');

const createPage = (pageTemplate) => {
    return new Promise((resolve, reject) => {
      fs.writeFile("./dist/teamProfile.html", pageTemplate, (err) => {        
        if (err) {
          reject(err);
          console.log(err);
          return;
        }        
        resolve({
          ok: true,
          message: "Thank you for using TGP- Team Profile Generator!!!! Team has been generated!  Look in the /dist folder to view output!"                   
        });
      });
    });
  };

  module.exports = createPage;