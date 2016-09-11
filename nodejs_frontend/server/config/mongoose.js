// This is our mongoose.js file located in /config/mongoose.js
// This is a config file that connects to MongoDB and loads all models for us. 
// We do this here because we don't want to have to connect to the DB every 
// time we require a model!
var mongoose = require('mongoose');
// require file-system so that we can load, read, require all of the model files
var fs = require('fs');
// connect to the database
mongoose.connect('mongodb://localhost/Mini_MEAN_Store');
// specify the path to all of the models
// fullWinPath win path support tool builds full win formate path
var tools = require('./tools');
var models_path = tools.fullWinPath('/server/models');
// var models_path = __dirname + '/../server/models'
// read all of the files in the models_path and for each one 
// check if it is a javascript file before requiring it

fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf('.js') > 0) {
    require(models_path + '/' + file);
    //console.log(models_path + '/' + file);
  }
})