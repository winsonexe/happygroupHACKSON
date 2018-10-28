var express=require('express');
var router=express.Router();
/*var connection= require('../bin/db');
*/
//upload上傳圖片
var fs = require('fs');
var multer = require('multer')
var path = require("path");
var sql= require('mssql');
var session=require('express-session');
var Connection = require('tedious').Connection;  
    var config = {  
        userName: 'happygroup',  
        password: 'Hackson123',  
        server: 'happygroup.database.windows.net',  
        // If you are on Microsoft Azure, you need this:  
        options: {encrypt: true, database: 'happygroupdb',rowCollectionOnDone: true}  
    };  
    var connection = new Connection(config);  
    connection.on('connect', function(err) {  
    // If no error, then good to proceed.  
        console.log("Connected");  
});  
var Request = require('tedious').Request;  
var TYPES = require('tedious').TYPES;  
storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // 文件初始路径
        let filePath = path.join(__dirname, '../public/upload');
        if (!fs.existsSync(filePath)) {
            fs.mkdir(filePath, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    cb(null, filePath)
                }
            })
        } else {
            cb(null, filePath)
        }
    },
    filename: function (req, file, cb) {
        var ext = path.extname(file.originalname);
        // UUID 处理
        function guid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0,
                    v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }

        cb(null, file.fieldname + guid() + Date.now() + ext)
    }
});
var upload = multer({storage: storage});
router.get('/',function(req,res,next){
    res.render('map');
});
router.post("/upload", upload.single('manyimg'), function (req, res) {
    console.log(req.file)
    console.log(path.basename(req.file.path));
    res.json({code: 200, filePath: 'http://' + req.headers.host + '/upload/' + path.basename(req.file.path),filename:path.basename(req.file.path)});
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
    var latitude=req.body.latitude;
    var longitude=req.body.longitude;
    var smalldog=req.body.smalldog;
    var dogkind=req.body.dogkind;
    var dogsex=req.body.dogsex;
    
    request = new Request('INSERT INTO animalinformation (memberID,title,tag,color,image,ifcut,birthday,introduction,latitude,longitude,postname,phonenumber,facebook,line,email,uploaddate,smalldog,dogclassification,dogsex) VALUES (@memberID,@title,@tag,@dogcolor,@photo,@ifcut,@birthday,@introduction,@latitude,@longitude,@username,@phonenumber,@facebookid,@lineid,@email,CURRENT_TIMESTAMP,@smalldog,@dogkind,@dogsex ); '
     
    ,function(error){
		//檢查是否有錯誤
		if (error) {  
            
            console.log(error);}  
        });  
        
        request.addParameter('title', TYPES.NVarChar,title);  
        request.addParameter('photo', TYPES.NVarChar ,photo);  
        request.addParameter('tag', TYPES.NVarChar, tag);  
        request.addParameter('dogcolor', TYPES.NVarChar,dogcolor);
        request.addParameter('ifcut', TYPES.NVarChar,ifcut);  
        request.addParameter('birthday', TYPES.NVarChar ,birthday);  
        request.addParameter('introduction', TYPES.NVarChar, introduction);  
        request.addParameter('latitude', TYPES.NVarChar,latitude);  
        request.addParameter('longitude', TYPES.NVarChar,longitude);  
        request.addParameter('username', TYPES.NVarChar,username);  
        request.addParameter('phonenumber', TYPES.VarChar,phonenumber);  
        request.addParameter('facebookid', TYPES.NVarChar, facebookid);  
        request.addParameter('lineid', TYPES.NVarChar, lineid);  
        request.addParameter('email', TYPES.NVarChar,email);
        request.addParameter('memberID', TYPES.Char,req.session.memberid);  //req.session.memberid
        request.addParameter('smalldog', TYPES.Bit,smalldog);
        request.addParameter('dogkind', TYPES.NVarChar,dogkind);
        request.addParameter('dogsex', TYPES.NVarChar,dogsex);
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
//會員註冊 
router.post('/memberSingUp',function(req, res , next){ 

    var username=req.body.username; 
    var password = req.body.password; 
    var phonenumber=req.body.phonenumber; 
    var facebookid=req.body.facebookid; 
    var lineid=req.body.lineid; 
    var email=req.body.email; 
    
    console.log(facebookid); 
    request = new Request('INSERT INTO memberSingUp (username,password,phonenumber,facebookid,lineid,email) VALUES (@username,@password,@phonenumber,@facebookid,@lineid,@email);' 
    
    ,function(error){ 
    //檢查是否有錯誤 
    if (error) { 
    
    console.log(error);} 
    }); 
    
    //request.addParameter('img', TYPES.Image ,photo); 
    request.addParameter('username', TYPES.NVarChar,username); 
    request.addParameter('password', TYPES.NVarChar,password); 
    request.addParameter('phonenumber', TYPES.Int,phonenumber); 
    request.addParameter('facebookid', TYPES.NVarChar, facebookid); 
    request.addParameter('lineid', TYPES.NVarChar, lineid); 
    request.addParameter('email', TYPES.NVarChar,email); 
    
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
    });//end會員註冊 
    
    //會員登入 
router.post('/memberLogIn',function(req, res , next){ 
    
    var username=req.body.username; 
    var password = req.body.password; 
    request = new Request( 
    'select * from memberSingUp where username=@username and password=@password;',
    
    function(error) {
    
        if (error){
            req.session.loginPass=false;
            req.session.memberid=''; 
            res.send('loginFail');     //登入失敗
         }
    })
    .on('doneInProc',function(rowCount, more, rows){
       
        if(rowCount==0){
            req.session.loginPass=false;
            req.session.memberid='';
            console.log("failwwwww"); 		
            res.send('loginFail');     //登入失敗		
            console.log("fail2");
        }else{	
            
            req.session.loginPass=true;
            req.session.memberid=rows[0][0]['value'];	
            
            
            res.send(rows);   //登入成功
            console.log(rows);
        }
        
    });
    request.addParameter('username', TYPES.NVarChar,username); 
    request.addParameter('password', TYPES.NVarChar,password);
      
    
     
    connection.execSql(request); // not empty
   
});


 router.post('/loadMap',function(req, res , next){                   //篩選後端 與資料庫比對


    request = new Request('SELECT * FROM animalinformation ;' 
    
    ,function(error){ 
    //檢查是否有錯誤 
    if (error) { 
    console.log("jime"); 
    console.log(error);} 
    }) 
    
    
    .on('doneInProc', function(rowCount, more, rows) { 
    
    res.send(rows); 
    //console.log(rows); 
    }); 
    connection.execSql(request); 
    //res.end(); 
    
 });

 router.post('/selectwants',function(req, res , next){                   //載入地圖上上傳的點
    for (var i = map.entities.getLength() - 1; i >= 0; i--) {
        var pushpin = map.entities.get(i);
        if (pushpin instanceof Microsoft.Maps.Pushpin) {
            map.entities.removeAt(i);
        }
    }
    var dogkind=req.body.dogkind;                             
    var dogsex=req.body.dogsex;
    var dogcolor=req.body.dogcolor;
    var tag=req.body.tag;
    var smalldog=req.body.smalldog;
    console.log(dogkind+" "+" "+dogsex+" "+dogcolor+" "+tag+" "+smalldog);
    if(dogkind!=-1&&dogsex==-1&&dogcolor==-1&&tag==-1&&smalldog==0){

    
        request = new Request('SELECT * FROM animalinformation where dogclassification=@dogkind;' 
    
        ,function(error){ 
        //檢查是否有錯誤 
        if (error) { 
            console.log(error);} 
        }) 
        .on('doneInProc', function(rowCount, more, rows) {
            if(rowCount==0){
                console.log('篩選數為0');
                res.send('dogzero');
            }
            else{
                console.log(rows); 
                res.send(rows); 
            }
        }); 
        request.addParameter('dogkind', TYPES.NVarChar,dogkind); 
    }
    connection.execSql(request); 
    
 })
 router.post('/memberiflogin',function(req, res , next){
    if(req.session.loginPass){
        var username=req.session.memberid; 
        res.send(username);
    }
    else{
        res.send('loginfalse');
    }
    


 });
 
module.exports=router;