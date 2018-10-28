var map;

var iflogin;

function loadMapScenario() { 
    loadMap();//呼叫資料庫，取所有點 
    
   map = new Microsoft.Maps.Map(document.getElementById('myMap'), { 
    /* No need to set credentials if already passed in URL */ 
    center: new Microsoft.Maps.Location(47.606209, -122.332071), 
    zoom: 12 }); 
    Microsoft.Maps.loadModule('Microsoft.Maps.AutoSuggest', function () { 
    var options = { 
    maxResults: 4, 
    map: map 
    }; 
    ; 
    var manager = new Microsoft.Maps.AutosuggestManager(options); 
    manager.attachAutosuggest('#searchBox', '#searchBoxContainer', selectedSuggestion); 
    }); 
    
    function loadMap(){//載入所有點 
    $.ajax({ 
    url: '/map/loadMap', 
    type: 'POST', 
    //async:false, 
    
    error: function(xhr) { 
    alert('Ajax request 發生錯誤'); 
    }, 
    success: function(response) { 
    var pin = new Array(); 
    for(var i = 0; i < response[0].length; i++){ 
    //console.log(response[0][i].length); 
    var k = new Microsoft.Maps.Location(response[i][11]['value'], response[i][12]['value']); 
    pin[i] = new Microsoft.Maps.Pushpin(k,2); 
    var infobox = new Microsoft.Maps.Infobox(k, { maxHeight:245, maxWidth: 250,title: 'Map Center'+i, 
    description: 'Seattle', visible: false , 
    actions: [{ label: '詳細資訊', eventHandler: function () { 
    $('#exampleModal').modal('show'); 
    document.getElementById("ss1").innerHTML = 'sss'; 
    } 
    }, 
    { label: 'Handler2', eventHandler: function () { 
    alert('Handler2'); 
    } 
    }, 
    { label: '刪除', eventHandler: function () { 
    alert('Handler3'); 
    } 
    }]}); 
    
    infobox.setMap(map); 
    
    //Store some metadata with the pushpin 
    pin[i].metadata = { 
    title: '['+response[i][3]['value']+'] '+response[i][1]['value'], 
    description: '<img src="/images/dog/'+i+'.jpg" class="img-fluid" style="width:400px;width:80%;height:80%; height=300px;display:block;">'
    }; 
    
    Microsoft.Maps.Events.addHandler(pin[i], 'click', function (args) { 
    infobox.setOptions({ location: args.target.getLocation(), 
    title: args.target.metadata.title, 
    description: args.target.metadata.description, 
    visible: true }); 
    
    }); 
    
    map.entities.push(pin); 
    } 
    
    } 
    }); 
    
    };//end載入所有點 
    
    //定位 
    navigator.geolocation.getCurrentPosition(function (position) { 
    var loc = new Microsoft.Maps.Location( 
    position.coords.latitude, 
    position.coords.longitude); 
    console.log(loc); 
    
    //Add a pushpin at the user's location. 
    var pin1 = new Microsoft.Maps.Pushpin(loc,{color:'red', visible:true}); 
    map.entities.push(pin1); 
    
    //Center the map on the user's location. 
    map.setView({ center: loc, zoom: 15 }); 
    }); 
    
    
    //搜尋 
    function selectedSuggestion(suggestionResult) { 
    
    //map.entities.clear(); 
    map.setView({ bounds: suggestionResult.bestView }); 
    var pushpin = new Microsoft.Maps.Pushpin(suggestionResult.location); 
    map.entities.push(pushpin); 
    
    } 
    
    memberiflogin();
} //end loadMapScenario
var myloc;


function loadMap(){//載入所有點 
    $.ajax({ 
    url: '/map/loadMap', 
    type: 'POST', 
    //async:false, 
    
    error: function(xhr) { 
    alert('Ajax request 發生錯誤'); 
    }, 
    success: function(response) { 
    var pin = new Array(); 
    for(var i = 0; i < response[0].length; i++){ 
    //console.log(response[0][i].length); 
    var k = new Microsoft.Maps.Location(response[i][11]['value'], response[i][12]['value']); 
    pin[i] = new Microsoft.Maps.Pushpin(k,2); 
    var infobox = new Microsoft.Maps.Infobox(k, { title: 'Map Center'+i, 
    description: 'Seattle', visible: false , 
    actions: [{ label: '詳細資訊', eventHandler: function () { 
    $('#exampleModal').modal('show'); 
    // document.getElementById("ss1").innerHTML = response[i][1]['value']; 
    // document.getElementById("ss2").innerHTML = response[i][3]['value']; 
    // document.getElementById("ss3").innerHTML = response[i][19]['value']; 
    // document.getElementById("ss4").innerHTML = response[i][20]['value']; 
    // document.getElementById("ss5").innerHTML = response[i][18]['value']; 
    // document.getElementById("ss6").innerHTML = response[i][8]['value']; 
    // document.getElementById("ss7").innerHTML = response[i][4]['value']; 
    // document.getElementById("ss8").innerHTML = response[i][5]['value']; 
    // document.getElementById("ss9").innerHTML = response[i][10]['value']; 
    // document.getElementById("ss10").innerHTML = response[i][13]['value']; 
    // document.getElementById("ss11").innerHTML = response[i][14]['value']; 
    // document.getElementById("ss12").innerHTML = response[i][16]['value']; 
    // document.getElementById("ss13").innerHTML = response[i][17]['value']; 
    // document.getElementById("ss14").innerHTML = response[i][15]['value'];
    } 
    }, 
    { label: 'Handler2', eventHandler: function () { 
    alert('Handler2'); 
    } 
    }, 
    { label: '刪除', eventHandler: function () { 
    alert('Handler3'); 
    } 
    }]}); 
    
    infobox.setMap(map); 
    
    //Store some metadata with the pushpin 
    pin[i].metadata = { 
    title: '['+response[i][3]['value']+'] '+response[i][1]['value'], 
    description: 'Discription for pushpin' + i 
    }; 
    
    Microsoft.Maps.Events.addHandler(pin[i], 'click', function (args) { 
    infobox.setOptions({ location: args.target.getLocation(), 
    title: args.target.metadata.title, 
    description: args.target.metadata.description, 
    visible: true }); 
    
    }); 
    
    map.entities.push(pin); 
    } 
    
    } 
    }); 
    
};//end載入所有點 
$("#dogcalender").daterangepicker(      //選擇日曆
    {
        singleDatePicker: true,                    //兩行設為單一日曆 原本預設為區間
        showDropdowns: true,
        autoUpdateInput: false,                 //清除預設 因可能有未知
        
        
    }
);
$("#dogcalender").on("apply.daterangepicker", function(ev, picker) {   //清除預設後需啟動否則當掉
    $(this).val(picker.startDate.format("MM/DD/YYYY"));
});

$("#updogpicture").change(function(){
    //當檔案改變後，做一些事 
    //$("#dogimage").html(""); // 清除預覽
    $("#dogimage").show();
   readURL(this);   // this代表<input id="imgInp">
 });
 function readURL(input){
   
    if(input.files && input.files[0]){
        var reader = new FileReader();
        reader.onload = function (e) {
           $("#dogimage").attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
      }
}

$('#updogs').on('hidden.bs.modal', function (e) {
        $("#dogimage").hide();
        
});
var latitude; //經緯度
var longitude;
$('#updogs').on('show.bs.modal', function (e) {
    if(iflogin==false){
        $('#updogs').modal('hide');
        alert("請先登入");
        return false;
    }
    navigator.geolocation.getCurrentPosition(function (position) { 
        loc = new Microsoft.Maps.Location( 
        position.coords.latitude,                     //取值
        position.coords.longitude); 
        latitude=loc.latitude;
        longitude=loc.longitude;
      
    });
})
 var photo;
$("#upload").click(function (){   //上傳動物
  
    uploadimage();
    
    
    var title=$('#updogtitle').val();                           //標題
    var dogkind=$('#selectbreed').val();                           //狗種
    var dogsex=$("input[name=upselectsexOptions]:checked").val();   //性別
    var tag=$("#upselectkind :selected").val();                  //標籤
    var dogcolor=$("#upselectcolor :selected").val();           //毛色
    var ifcut=$("input[name=givebirthOptions]:checked").val();  //結渣
    var birthday=$("#dogcalender").val();                        //狗的出生日
    var introduction=$("#introductiontext").val();               //狗的其他描述
    var username=$("#upusername").val();                        //po主名稱
    var phonenumber=$("#upphonenumber").val();                  //po主電話
    var facebookid=$("#upfacebook").val();                       //po主facebook
    var lineid=$("#upline").val();                               //po主line
    var email=$("#upemail").val();                                //po主email
    var smalldog;
    if($("#upsmalldogCheck").attr('checked')){

        smalldog=1;
     
     }else{
     
        //沒被勾選做什麼事
        smalldog=0;
     }
     
   
    $.ajax({
    url: '/map/uploaddog',
    type: 'POST',
    async: false,
    data:{title:title,tag:tag,dogcolor:dogcolor,ifcut:ifcut,
            birthday:birthday,introduction:introduction,username:username,
            phonenumber:phonenumber,facebookid:facebookid,lineid:lineid,
            email:email,photo:photo,latitude:latitude,longitude:longitude,
            smalldog:smalldog,dogkind:dogkind,dogsex:dogsex
        },
    
        error: function(xhr) {
            console.log('Ajax request 發生錯誤');
        },
        success: function(response) {
           
            console.log('上傳成功！');
        
        }
    });
    
});
function uploadimage() {
    var formData = new FormData($("#frmUploadFile")[0]);
    $.ajax({
        url: '/map/upload',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            if (200 === data.code) {
               
                console.log("圖片上傳成功");
            } else {
                console.log("圖片上傳失敗");
            }
           
            photo=data.filename;
        },
        error: function (err) {
            console.log("err", err);
           
        }
    });
}
//會員資料上傳(註冊)
$("#singup").click(function (){ 

    var username=$("#signusername").val(); //使用者名稱
    var password = $('#signpassword').val(); //密碼 
    var phonenumber=$("#signphonenumber").val(); //電話號碼
    var facebookid=$("#signfacebook").val(); //facebook帳號
    var lineid=$("#signline").val(); //line帳號
    var email=$("#signemail").val(); //email
    
    
   
    
    $.ajax({
    url: '/map/memberSingUp',
    type: 'POST',
    data:{username:username,password:password,
    phonenumber:phonenumber,facebookid:facebookid,lineid:lineid,
    email:email
    },
    
    error: function(xhr) {
    alert('Ajax request 發生錯誤');
    },
    success: function(response) {
    alert('上傳成功！');
    
    }
    });
    
});//end 會員資料上傳(註冊)
    
    
    //會員登入(送出)
$("#loginsubmit").click(function (){ 
    
    var username=$("#loginusername").val(); //使用者名稱
    var password = $('#loginpassword').val(); //密碼 
    
    
    
    $.ajax({
    url: '/map/memberLogIn',
    type: 'POST',
    async : false,
    data:{username:username,password:password},
    
    
    error: function(xhr) {
        alert('Ajax request 發生錯誤');
    },
    success: function(response) {
        console.log(response[0][0]['value']);
        
       
            $("#login1").empty();
            $("#login1").append(response[0][0]['value']);
            
        }
        
    });
});

//end會員登入(送出)

/*$.ajax({
    url: '/upload',
    type: 'POST',
    data: {},
    
        error: function(xhr) {
            alert('Ajax request 發生錯誤');
        },
        success: function(response) {
            alert('上傳成功！');
        
        }
    });
    */
   $("#singup").click(function (){ 

    var username=$("#signusername").val(); //使用者名稱
    var password = $('#signpassword').val(); //密碼 
    var phonenumber=$("#signphonenumber").val(); //電話號碼
    var facebookid=$("#signfacebook").val(); //facebook帳號
    var lineid=$("#signline").val(); //line帳號
    var email=$("#signemail").val(); //email
    
    
    
    
    $.ajax({
    url: '/map/memberSingUp',
    type: 'POST',
    data:{username:username,password:password,
    phonenumber:phonenumber,facebookid:facebookid,lineid:lineid,
    email:email
    },
    
    error: function(xhr) {
    alert('Ajax request 發生錯誤');
    },
    success: function(response) {
    alert('上傳成功！');
    
    }
    });
    
});
    
    
    
$("#selectwant").click(function (){                    //篩選動作
    
    if($("#selectbreed2").attr("value")!=0)
        var dogkind=$('#selectbreed2').val();
    else
        dogkind=-1;  
    if($("#selectedcolor :selected").attr("value")!=0)
        var dogcolor=$("#selectedcolor :selected").val();
    else
        dogcolor=-1;  
    if($("#selectkind :selected").attr("value")!=0)
        var tag=$("#selectkind :selected").val();
    else
        tag=-1;  
    if($("input[name=selectsexOptions]:checked").val()==undefined)
        var dogsex=-1;
    else
        dogsex=$("input[name=selectsexOptions]:checked").val();
    var smalldog;
    if($("#smalldogCheck").attr('checked')){

        smalldog=1;
     
     }else{
     
        //沒被勾選做什麼事
        smalldog=0;
     }
     alert(dogkind+" "+" "+dogsex+" "+dogcolor+" "+tag+" "+smalldog);
    $.ajax({
    url: '/map/selectwants',
    type: 'POST',
    async : false,
    data:{dogkind:dogkind,dogsex:dogsex,dogcolor:dogcolor,tag:tag,smalldog:smalldog},
    
    
    error: function(xhr) {
        alert('Ajax request 發生錯誤');
    },
    success: function(response) {
        if(response='dogzero'){
            alert("沒有資料!");
        }
        else{
            alert("篩選成功");
        }
    }
    });

});

function memberiflogin(){ //用戶是否登入

    $.ajax({
        url: '/map/memberiflogin',
        type: 'POST',
        data:{},
        
        error: function(xhr) {
            alert('Ajax request 發生錯誤');
        },
        success: function(response) {
            if(response=='loginfalse'){
                iflogin=false;
            }
            else{
                $("#login1").empty();
                $("#login1").append(response);
                
            }
        }
    });
    


}