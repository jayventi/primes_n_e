var working_port = 8078;
var valedationErrMsg ={errmsg:''};

/* require needed libraries create  main server objects  */

// require custoum tools, utility lib
var tools = require('./server/config/tools.js');

// require the path module
var path = require("path");

// require express and create the express app
var express = require("express");
var app = express();


// require bodyParser to handle post data for adding a user
var bodyParser = require("body-parser");
//app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));


// setup static content route
app.use(express.static(path.join(__dirname, "./client")));


// requires and runs code in routes.js file, passes it needed scope(s) 
// deligate setting up our routing rules there
// will call nodejs controllers and routing rules
require('./server/config/routes.js')(app,bodyParser,tools);

console.log("currently running os: " + process.platform);
console.log("current node vertion: "+ process.versions.node);
// Start nodejs as an api server, listen on working_port
app.listen(working_port, function() {
	console.log("listening on port "+ working_port);
});
