
var labelTextCollision = new L.LabelTextCollision({
    collisionFlg: false
});

var map = new L.map('map-view', {
    center: new L.LatLng(25.05, 121.45),
    //attributionControl: true,
    zoom: 12,
    zoomControl: false,
    preferCanvas: true
    //renderer: labelTextCollision
});
map.doubleClickZoom.disable();
var polygons = L.featureGroup().addTo(map);
L.control.zoom({
    position: 'topleft'
}).addTo(map);
// add location control to global name space for testing only
// on a production site, omit the "lc = "!
let lc = L.control.locate({
    strings: {
        title: "Show me where I am, yo!"
    }
}).addTo(map);
//basemap in BaseMapMethods
map.addControl(L.control.basemaps({
    position: 'topright',
    basemaps: basemaps,
    tileX: 213,  // tile X coordinate
    tileY: 110,  // tile Y coordinate
    tileZ: 8   // tile zoom level
}));

var DateTimeBar = L.control({ position: 'bottomleft' });

DateTimeBar.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'legend'); // create a div with a class "info"
    div.innerHTML = '<div class="ex-css-box"></div>';
    return div;
};
DateTimeBar.addTo(map);

const legend = L.control({ position: 'bottomleft' });
legend.onAdd = (map) => { return L.DomUtil.create('div', 'info legend p-2 mb-5 rounder shadow legendType'); }
legend.addTo(map);


const itemControl = L.control({ position: "topright" });
itemControl.onAdd = function (map) {

    let div = L.DomUtil.create('div', 'info legend p-0 m-3 rounder shadow')
    // loop through our density intervals and generate a label with a colored square for each interval
    div.innerHTML = `<div class="btn-group-vertical" role="group" aria-label="">
                      <input type="radio" class="btn-check" name="radioItem" id="btn-BOD" value = "BODs" autocomplete="off" >
                      <label class="btn btn-outline-primary d-none" for="btn-BOD"><i class="fa-solid fa-biohazard"></i> 生物需氧</label>
                    
                      <input type="radio" class="btn-check" name="radioItem" id="btn-DO" value = "DOs" autocomplete="off" checked>
                      <label class="btn btn-outline-primary" for="btn-DO"><i class="fa-solid fa-hand-holding-droplet"></i>   水中氧氣</label>
                      <input type="radio" class="btn-check" name="radioItem" id="btn-RPI" value = "RPIs" autocomplete="off" >
                      <label class="btn btn-outline-primary" for="btn-RPI"><i class="fa-solid fa-water"></i> 水中污染</label>
                    </div>`;

    return div;
};
itemControl.addTo(map);

const layerControl = L.control({ position: "topright" });
layerControl.onAdd = function (map) {

    let div = L.DomUtil.create('div', 'info legend p-1 m-3 rounder shadow')
    // loop through our density intervals and generate a label with a colored square for each interval
    div.innerHTML = `<div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="checkbox-CWB" >
                        <label class="form-check-label fw-bolder " for="checkbox-CWB">氣象站</label>
                    </div>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="checkbox-intercept">
                        <label class="form-check-label fw-bolder " for="checkbox-intercept">截流站</label>
                    </div>`;

    return div;
};
layerControl.addTo(map);
//var kmz = L.kmzLayer().addTo(map);
//kmz.on('load', function (e) {
//    control.addOverlay(e.layer, e.name);
//});
//kmz.load('https://cwbopendata.s3.ap-northeast-1.amazonaws.com/DIV2/O-A0038-002.kmz');
//var control = L.control.layers(null, null, { collapsed: false }).addTo(map);

var autoStationGroup = L.featureGroup().addTo(map);
var CWBStationGroup = L.featureGroup();
var FishGroup = L.featureGroup().addTo(map);
var interceptStationGroup = L.featureGroup();
const icon = new L.icon({
    iconUrl: 'https://wq.epa.gov.tw/EWQP_GIS/images/point/icon-riverExternal.svg',
    iconSize: [50, 50]
});

function setDivIcon(image,message) {
    let divIcon = new L.DivIcon({
        className: 'row ',
        html: `<div class="col-12"><span class="div-span text-black fw-bold badge  opacity-75">${message}</span></div>
               <div class="col-12"><img class="div-image shadow" src="${image}"/></div>`,
        iconSize: [50, 50]
    });
    return divIcon;
}


function setMarker(coordinate,name,groupName,setIcon,interactive) {
    let marker = L.marker([coordinate[1], coordinate[0]], {
        icon: setIcon,
        text: name,
        interactive: interactive
    });
    marker.addTo(groupName);
    return marker;
}


function setMapLegendHtml(type) {

    if (type == "RPIs") {
        let grades = [6.0, 3.0, 2, 0];
        //// loop through our density intervals and generate a label with a colored square for each interval
        let labels = ['<strong>河川污染程度</strong>'];
        for (let i = 0; i < grades.length; i++) {
            labels.push(`<i class='p-1' style='background:${getWarningColor(grades[i] + 1, type)}'></i><span class="m-1"> ${warningName(grades[i], type)}</span>`);
        }
        return labels.join('<br>');
    } else if (type == "BODs") {

        let grades = [ 90, 70, 50, 40, 30, 20, 15, 10, 6, 2, 1, 0];
        //// loop through our density intervals and generate a label with a colored square for each interval
        let labels = ['<strong>生物需氧(mg/l)</strong>'];
        for (let i = 0; i < grades.length; i++) {
            labels.push(`<i class='p-1' style='background:${getWarningColor(grades[i] + 1, type)}'></i><span class="m-1"> ${warningName(grades[i], type)} </span>`);
        }
        return labels.join('<br>');
    } else if (type == "DOs") {

        let grades = [2,1, 0];
        //// loop through our density intervals and generate a label with a colored square for each interval
        let labels = ['<strong>水中氧氣</strong>'];
        for (let i = 0; i < grades.length; i++) {
            labels.push(`<i class='p-1' style='background:${getWarningColor(grades[i] + 1, type)}'></i><span class="m-1"> ${warningName(grades[i], type)} </span>`);
        }
        return labels.join('<br>');

    }
    
}

function warningName(number,type) {
    if (type == "RPIs") {
        switch (number) {
            case 0:
                return "未(稍)受汙染";
            case 2:
                return "輕度汙染";
            case 3:
                return "中度汙染";
            case 6:
                return "嚴重汙染";
        }
    } else if (type == "DOs") {
        switch (number) {
            case 0:
                return "水中缺氧";
            case 1:
                return "水中快缺氧";
            case 2:
                return "氧氣充足"
        }
    }else {
        return number;
    }
}
var villages = L.geoJson(northVillage.features, {
    style: villageStyle,
    onEachFeature: function (feature, layer) {
        layer.bindTooltip(feature.properties.TOWNNAME + feature.properties.VILLNAME, { permanent: false, sticky: true });
    }
}).addTo(map);
var Parks = L.geoJson(riverParks.features, {
    style: ParkStyle
}).addTo(map);



function createRenderer(paneName) {
    var renderer = (L.SVG && L.svg()) || (L.Canvas && L.canvas());
    renderer.options.pane = paneName;
    return renderer;
}

