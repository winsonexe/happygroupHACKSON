var map;



function loadMapScenario() {
    var map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
        /* No need to set credentials if already passed in URL */
        center: new Microsoft.Maps.Location(25.033408, 121.564099) });
    var center = map.getCenter();
    var pushpin = new Microsoft.Maps.Pushpin(map.getCenter(), null);  //定位的那個圖釘
   
    var infobox = new Microsoft.Maps.Infobox(center, {maxHeight:300, maxWidth: 250, title: '流浪狗1號',
        description: '<img src="http://localhost:3000/images/dog/1.jpg" style="height:150px ;width:100% ;display:block" class="img-fluid" alt="Responsive image" >毛色:黃,耳朵:尖耳,其他:活潑好動', 
        actions: [{ label: 'Handler1', eventHandler: function () {
            alert('Handler1');
            }
        },
             { label: 'Handler2', eventHandler: function () {
                alert('Handler2');
                }
            },
            { label: 'Handler3', eventHandler: function () {
                alert('Handler3');
                }
            }
        ],
        visible: false });
    infobox.setMap(map);
    Microsoft.Maps.Events.addHandler(pushpin, 'click', function () {
        infobox.setOptions({ visible: true });
    });
    map.entities.push(pushpin);
    
}

/*  
var imageProc = function (input) {      //圖片處理 可預覽
    if (input.files && input.files[0]) {
     // 建立一個 FileReader 物件
      var reader = new FileReader();
     // 當檔案讀取完後，所要進行的動作
     reader.onload = function (e) {
       // 顯示圖片
        $('#show_image').attr("src", e.target.result).css("height", "500px").css("width", "500px");
       // 將 DataURL 放到表單中
       $("input[name='imagestring']").val(e.target.result);
      };
     reader.readAsDataURL(input.files[0]);
    }
}
$("#img_upload_file1").change(function() { 


}
*/
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

$("#upload").click(function (){   //上傳動物
   
    var title=$('#updogtitle').val();                           //標題
    var photo=$("#updogpicture").val();                          //照片上傳
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
    var nowtime=new Date();                                       //po的上傳時間  一個月消失

    alert(title+' '+photo+'  '+tag+' '+dogcolor+' '+ifcut+' '+birthday+' '
    +introduction+'  '+username+'  '
    +phonenumber+' '+facebookid+' '+lineid+' '+email+' '+nowtime);
    
    $.ajax({
    url: '/map/uploaddog',
    type: 'POST',
    data:{title:title,photo:photo,tag:tag,dogcolor:dogcolor,ifcut:ifcut,
            birthday:birthday,introduction:introduction,username:username,
            phonenumber:phonenumber,facebookid:facebookid,lineid:lineid,
            email:email,nowtime:nowtime
        },
    
        error: function(xhr) {
            alert('Ajax request 發生錯誤');
        },
        success: function(response) {
            alert('上傳成功！');
        
        }
    });
    
});
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