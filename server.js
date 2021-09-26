const express = require('express');
const bodyParser = require('body-parser');

//create express app
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//parse requests of content-type
app.use(bodyParser.urlencoded({extended: true}))

//parse requests of content-type / application/json
app.use(bodyParser.json())

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//Connecting to the database
mongoose.connect(dbConfig.url)
.then(() =>{
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log("could not connect to the database. Exiting now..", err);
    process.exit();
});

//define a simple route
app.get('/', (req, res) =>{
    res.json({"message": "Welcome to red-bicicletas"});
});

// Require bicicleta routes
require('./app/routes/lf.routes.js')(app);

//listen for requests
app.listen(5000, () => {
    console.log("Server is listening on port 5000");
});
