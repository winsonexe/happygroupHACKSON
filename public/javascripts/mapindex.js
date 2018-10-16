var map;
window.onload=loadMapScenario();


function loadMapScenario() {
    var map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
        /* No need to set credentials if already passed in URL */
        center: new Microsoft.Maps.Location(25.033408, 121.564099) });
    var center = map.getCenter();
    var pushpin = new Microsoft.Maps.Pushpin(map.getCenter(), null);
    var infobox = new Microsoft.Maps.Infobox(center, {maxHeight:400, maxWidth: 420, title: '流浪狗1號',
        description: '<img src="http://localhost:3000/images/dog/1.jpg " width="350" height="300" allowFullScreen frameBorder="0"></iframe>毛色:黃,耳朵:尖耳,其他:活潑好動', visible: false });
    infobox.setMap(map);
    Microsoft.Maps.Events.addHandler(pushpin, 'click', function () {
        infobox.setOptions({ visible: true });
    });
    map.entities.push(pushpin);
    
}