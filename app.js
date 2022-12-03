const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config()
// const http = require('http');
// const https = require('https');

// const fs = require('fs');
// var privateKey = fs.readFileSync(`sslcert/server.key`, `utf8`);
// var certificate = fs.readFileSync(`sslcert/server.crt`, `utf8`);

const app = express();
app.use(cors());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())


// Configuring the database
const dbConfig = require('./apps/config/db.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

global.__basedir = __dirname;

// Require Notes routes
require('./apps/routes/routes.js')(app);


const dirname = path.resolve();
app.use("/resources/uploads/", express.static(path.join(dirname, "/resources/uploads/")));

// listen for requests
const server = app.listen(process.env.PORT || 4002, () => {
    const port = server.address().port;
    console.log(`express is working on port ${port}`);
})