const path = require('path')

const appRouter = (app, fs) => {

// variables
const dataPath = './data/users.json';

app.get('/', function(req, res) {
      fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }
      res.render("index.html", {title:'Users',data:JSON.parse(data)});
    });

}); 


};

 module.exports = appRouter;