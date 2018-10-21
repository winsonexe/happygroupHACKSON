var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

// Create connection to database
var config = 
   {
     userName: 'happygroup', // update me
     password: 'Hackson123', // update me
     server: 'happygroup.database.windows.net', // update me
     options: 
        {
           database: 'happygroupdb' //update me
           , encrypt: true
        }
   }
var connection = new Connection(config);
