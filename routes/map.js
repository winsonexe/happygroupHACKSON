var express=require('express');
var router=express.Router();
/*var connection= require('../bin/db');
*/
var sql= require('mssql');
var Connection = require('tedious').Connection;  
    var config = {  
        userName: 'happygroup',  
        password: 'Hackson123',  
        server: 'happygroup.database.windows.net',  
        // If you are on Microsoft Azure, you need this:  
        options: {encrypt: true, database: 'happygroupdb'}  
    };  
    var connection = new Connection(config);  
    connection.on('connect', function(err) {  
    // If no error, then good to proceed.  
        console.log("Connected");  
});  
var Request = require('tedious').Request;  
var TYPES = require('tedious').TYPES;  


router.get('/',function(req,res,next){
    res.render('map');
});
router.post('/uploaddog',function(req, res , next){
	
	
    var title=req.body.title;
    var photo=req.body.photo;
    var tag=req.body.tag;
    var dogcolor=req.body.dogcolor;
    var ifcut=req.body.ifcut;
    var birthday=req.body.birthday;
    var introduction=req.body.introduction;
    var username=req.body.username;
    var phonenumber=req.body.phonenumber;
    var facebookid=req.body.facebookid;
    var lineid=req.body.lineid;
    var email=req.body.email;
    
    console.log(title);
    
    request = new Request('INSERT INTO animalinformation (memberID,title,tag,color,ifcut,birthday,introduction,postname,phonenumber,facebook,line,email,uploaddate) VALUES (@memberID,@title,@tag,@dogcolor,@ifcut,@birthday,@introduction,@username,@phonenumber,@facebookid,@lineid,@email,CURRENT_TIMESTAMP);'
     
    ,function(error){
		//檢查是否有錯誤
		if (error) {  
            console.log("jime");
            console.log(error);}  
        });  
        request.addParameter('title', TYPES.NVarChar,title);  
        //request.addParameter('img', TYPES.Image ,photo);  
        request.addParameter('tag', TYPES.NVarChar, tag);  
        request.addParameter('dogcolor', TYPES.NVarChar,dogcolor);
        request.addParameter('ifcut', TYPES.NVarChar,ifcut);  
        request.addParameter('birthday', TYPES.NVarChar ,birthday);  
        request.addParameter('introduction', TYPES.NVarChar, introduction);  
        request.addParameter('username', TYPES.NVarChar,username);  
        request.addParameter('phonenumber', TYPES.Int,phonenumber);  
        request.addParameter('facebookid', TYPES.NVarChar, facebookid);  
        request.addParameter('lineid', TYPES.NVarChar, lineid);  
        request.addParameter('email', TYPES.NVarChar,email);
        request.addParameter('memberID', TYPES.Char,8787);
       
        request.on('row', function(columns) {  
            columns.forEach(function(column) {  
              if (column.value === null) {  
                console.log('NULL');  
              } else {  
                console.log("Product id of inserted item is " + column.value);  
              }  
            });  
        });     
        connection.execSql(request);  
        res.end();
});
module.exports=router;