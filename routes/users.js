const userRoutes = (app, fs) => {
 // variables
const dataPath = './data/users.json';


app.get('/users', (req, res) => {
      res.render("users.html", {title:'Users',data:[]});
});
  

app.get('/users/:id', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }
      const result = JSON.parse(data).find( fn => fn.id == req.params.id);
      //res.send(result);
      res.render("users.html", {title:'Users',data:result});
    }, true);
});


// CREATE
app.post('/users', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }
      let result = JSON.parse(data);
    // Note: this needs to be more robust for production use. 
    // e.g. use a UUID or some kind of GUID for a unique ID value.
    const newUserId = Date.now().toString();
    // add the new user
    result.push(req.body);
    req.body.id = newUserId;   
  
    fs.writeFile(dataPath,JSON.stringify(result, null, 2), (err) => {
      res.render("index.html", {title:'Users',data:result});
      //res.status(200).send('new user added, '+newUserId);
      console.log('new user added, '+newUserId);
    });    
  }, true);
});

// Update data by id
app.post('/users/:id', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }
      let result = JSON.parse(data);
    // find index in data
    let idx =  result.findIndex(x => x.id == req.params.id);
    result[idx] = req.body;

    fs.writeFile(dataPath,JSON.stringify(result, null, 2), (err) => {
      res.render("index.html", {title:'Users',data:result});
      //res.status(200).send('new user added, '+newUserId);
      console.log('new user edited, '+req.params.id);
    });

    // sending 404 when not found something is a good practice
    }, true);
});

// delete
app.post('/users/del/:id', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }
      const result = JSON.parse(data).filter( fn => fn.id != req.params.id);
      //res.send(result);
      console.log(req.params.id);
      fs.writeFile(dataPath, JSON.stringify(result, null, 2), (err) => {
         if (err) {
          throw err;
         } 
         res.render("index.html", {title:'Users',data:result});
      //res.status(200).send('new user deleted, ID: '+req.params.id);
    }); 
    }, true);
});  
};

module.exports = userRoutes;
