//須注意TMERC.js 必須要加入 FOR CHROM  否則無法進行座標轉換      
Proj4js.defs["EPSG:3826"] = "+title=TWD97 TM2+proj=tmerc +lat_0=0 +lon_0=121 +k=0.9999 +x_0=250000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ";
//https://gis.rchss.sinica.edu.tw/qgis/?p=3542  TWD67 原轉換公式會有問題
Proj4js.defs["EPSG:3828"] = "+title=TWD67 TM2+proj=tmerc +lat_0=0 +lon_0=121 +k=0.9999 +x_0=250000 +y_0=0 +ellps=aust_SA +towgs84=-752,-358,-179,-0.0000011698,0.0000018398,0.0000009822,0.00002329 +units=m +no_defs";
Proj4js.defs["EPSG:3857"] = "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs";
Proj4js.defs["EPSG:3824"] = "+proj=longlat +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +no_defs ";



var EPSG3826 = new Proj4js.Proj('EPSG:3826'); //TWD97 TMS
var EPSG4326 = new Proj4js.Proj('EPSG:4326'); //WGS84
var EPSG3828 = new Proj4js.Proj('EPSG:3828'); //TWD67 TM2
var EPSG3857 = new Proj4js.Proj('EPSG:3857'); //WGS84 WMS
var EPSG3824 = new Proj4js.Proj('EPSG:3824'); //TWD97 經緯度
//X,Y(原座標),從舊EPSG  ，到新EPSG
function TransCoord(x, y, from, to) {
    // proj4js.js + projCode資料夾
    var result;
    if (Proj4js) {
        var p = new Proj4js.Point(parseFloat(x), parseFloat(y));
        Proj4js.transform(from, to, p);
        // 回傳為 Object 使用方法如 obj.x、obj.y
        result = [ p.x,  p.y ];
    }
    //console.log(result);
    return result;
}