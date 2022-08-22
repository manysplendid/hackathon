//LineColorSetting
function LineStyle(feature) {
    let style = {
        weight: 2,
        opacity: 0,
        color: "#666",
        fillColor: "lightblue",
        fillOpacity: 0.8
    }

    return style;
}
//VillageColorSetting
function villageStyle(feature) {
    let style = {
        weight: 1,
        opacity: 0.4,
        color: "#b2b2b2",
        fillColor: "lightblue",
        fillOpacity: 0
    }

    return style;
}
//ParkColorSetting
function ParkStyle(feature) {
    let style = {
        weight: 1,
        opacity: 0.4,
        color: "#b2b2b2",
        fillColor: "green",
        fillOpacity: 0.5
    }

    return style;
}
function setPipeColor(i) {
    let color = "rgba(255, 255, 255, 1)";
    switch (i) {
        case 1:
            color = "red";
            break;
        case 2:
            color = "orange";
            break;    
        case 3:
            color = "yellow";   
            break; 

    }

    return color;
}
function getWarningColor(d,type) {
    switch (type) {
        case "RPIs":
            return getRPIColor(d);
            break;
        case "BODs":
            return getBODColor(d);
            break;
        case "DOs":
            return getDOColor(d);
            break;
    }
}


function getRPIColor(d) {
    return d > 6 ?   '#005359' :
           d > 3 ?   '#36B0A4' :
           d > 2 ?   '#A9E79C' :
           d > 0.1 ? '#eeee6a' :
                     'rgba(255,255,255,0)';
}

function getBODColor(d) {
    return d > 300 ? '#FFD6FE' :
        d > 200 ? '#FF38FC' :
            d > 150 ? '#DA2CD2' :
                d > 130 ? '#AB21A3' :
                    d > 110 ? '#AB1801' :
                        d > 90 ? '#DA2305' :
                            d > 70 ? '#FF2B07' :
                                d > 50 ? '#FFA71F' :
                                    d > 40 ? '#FED428' :
                                        d > 30 ? '#FEFE32' :
                                            d > 20 ? '#01F92F' :
                                                d > 15 ? '#27A31B' :
                                                    d > 10 ? '#0177FD' :
                                                        d > 6 ? '#00A5FF' :
                                                            d > 2 ? '#01D2FD' :
                                                                d > 1 ? '#9DFFFF' :
                                                                    d > 0.1 ? '#CACACA' :
                                                                        'rgba(255,255,255,0)';
}
function getDOColor(d) {
    return d > 2 ? '#9DFFFF' :
        d > 1 ? '#FED428' :
        d > 0 ? '#FF2B07' : 'rgba(255,255,255,0)';
                                                                        
}