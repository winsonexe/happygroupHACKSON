var map;
window.onload=loadMapScenario();


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
$('#upload').click(function (){   //上傳動物
    alert('title');
    var title=$('#updogtitle1').text();                     //標題
    var tag=$("#upselectkind :selected").text();         //標籤
    var dogcolor=$("updelectedcolor :selected").text();   //毛色
    var ifcut=$("input[name=radioName]:checked").val();  //結渣
    
    alert('title');
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
});