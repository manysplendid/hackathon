/* need to add Methods before map*/
/* 國土測繪中心 url:https://maps.nlsc.gov.tw/S09SOA/*/

var basemaps = [];

var NLSCEMAP = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/{id}/default/GoogleMapsCompatible/{z}/{y}/{x}.png', {
    subdomains: 'abcd',
    maxZoom: 19,
    minZoom: 0,
    renderer: L.canvas(),
    id: 'EMAP',
    label: '臺灣通用電子地圖'
    
});
var NLSCEMAP2 = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/{id}/default/GoogleMapsCompatible/{z}/{y}/{x}.png', {
    subdomains: 'abcd',
    maxZoom: 19,
    minZoom: 0,
    renderer: L.canvas(),
    id: 'EMAP2',
    label: '臺灣通用電子地圖透明'

});

var NLSCEMAP5 = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/{id}/default/GoogleMapsCompatible/{z}/{y}/{x}.png', {
    subdomains: 'abcd',
    maxZoom: 19,
    minZoom: 0,
    renderer: L.canvas(),
    id: 'EMAP5',
    label: '臺灣通用電子地圖(套疊等高線)'

});
var NLSCLUIMAP = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/{id}/default/GoogleMapsCompatible/{z}/{y}/{x}.png', {
    subdomains: 'abcd',
    maxZoom: 19,
    minZoom: 0,
    renderer: L.canvas(),
    id: 'LUIMAP',
    label: '國土利用調查成果圖'

});
var NLSCLANDSECT = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/{id}/default/GoogleMapsCompatible/{z}/{y}/{x}.png', {
    subdomains: 'abcd',
    maxZoom: 19,
    minZoom: 0,
    renderer: L.canvas(),
    id: 'LANDSECT',
    label: '段籍圖'

});
var NLSCPHOTO2 = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/{id}/default/GoogleMapsCompatible/{z}/{y}/{x}.png', {
    subdomains: 'abcd',
    maxZoom: 19,
    minZoom: 0,
    renderer: L.canvas(),
    id: 'PHOTO2',
    label: '正射影像圖(通用版)'

});
var NLSCB5000 = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/{id}/default/GoogleMapsCompatible/{z}/{y}/{x}.png', {
    subdomains: 'abcd',
    maxZoom: 19,
    minZoom: 0,
    renderer: L.canvas(),
    id: 'B5000',
    label: '1/5000基本地形圖'

});



var osm = new L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    subdomains: 'abcd',
    maxZoom: 19,
    minZoom: 0,
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    preferCanvas: true,//use Canvas
    renderer: L.canvas(),
    label: 'OpenStreetMap'
}); 
        var osm = new L.TileLayer('https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=36048c13fe024aeeb40f22153f3f7537');
basemaps = [NLSCEMAP, NLSCEMAP2, NLSCEMAP5,  NLSCLUIMAP, NLSCLANDSECT, NLSCPHOTO2, NLSCB5000];