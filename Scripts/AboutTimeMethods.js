// Input DateTime to String
function getStrTime(d) {
    let y = d.getFullYear();
    let mon = d.getMonth() + 1;
    mon = ((mon < 10) ? "0" : "") + mon
    let day = d.getDate();
    day = ((day < 10) ? "0" : "") + day
    let h = d.getHours()
    let m = d.getMinutes()
    let s = d.getSeconds()
    let time = ((h < 10) ? "0" : "") + h
    time += ((m < 10) ? ":0" : ":") + m
    time += ((s < 10) ? ":0" : ":") + s
    StrTime = y + "/" + mon + "/" + day + " " + time;
    return StrTime;
}

// datetime => new Date()
// addms    => add or substration microsecond
// TimeFormat=> like C# timeformat
function getfulltime(datetime, addms, Timeformat) {

    let d = new Date(datetime.getTime() + 1000 * addms);
    let mon = d.getMonth() + 1;
    mon = ((mon < 10) ? "0" : "") + mon
    let day = d.getDate();
    day = ((day < 10) ? "0" : "") + day;
    let h = d.getHours();
    let m = d.getMinutes();
    let s = d.getSeconds();
    let ms = d.getMilliseconds();
    h = ((h < 10) ? "0" : "") + h;
    m = ((m < 10) ? "0" : "") + m;
    s = ((s < 10) ? "0" : "") + s;
    ms = ((ms < 10) ? "0" : "") + ms;

    Timeformat = Timeformat.replace("yyyy", "{0}");
    Timeformat = Timeformat.replace("MM", "{1}");
    Timeformat = Timeformat.replace("dd", "{2}");
    Timeformat = Timeformat.replace("HH", "{3}");
    Timeformat = Timeformat.replace("mm", "{4}");
    Timeformat = Timeformat.replace("SS", "{5}");
    Timeformat = Timeformat.replace("ss", "{6}");

    outputtime = String.format(Timeformat, d.getFullYear(), mon, day, h, m, s, ms);
    return outputtime;
};

function addMinutes(date, minutes) {
    let result = new Date(date);
    result.setMinutes(result.getMinutes() + minutes);
    return result;
}

//compare NowTime var Date
function DateTimeCompareTimeNow(SourceTime) {
    // 0:SameTime
    // 1:FCSTTime
    // -1:PassTime
    let check = 0;
    if (Date.now().valueOf() < SourceTime.valueOf()) {
        check = 1;
    } else if (Date.now().valueOf() == SourceTime.valueOf()) {
        check = 0;
    } else if (Date.now().valueOf() > SourceTime.valueOf()) {
        check = -1;
    }
    return check;
}

//compare NowTime var String
function StringTimeCompareTimeNow(SourceTime) {
    // 0:SameTime
    // 1:FCSTTime
    // -1:PassTime
    let check = 0;
    let TimeNow = Date.now();
    let STime = Date.parse(SourceTime);
    if (TimeNow.valueOf() < STime.valueOf()) {
        check = 1;
    } else if (TimeNow.valueOf() == STime.valueOf()) {
        check = 0;
    } else if (TimeNow.valueOf() > STime.valueOf()) {
        check = -1;
    }
    return check;
}

function StringTwoTimesCompare(SourceTime, CompareTime) {
    // 0:SameTime
    // 1:FCSTTime
    // -1:PassTime
    let check = 0;
    let STime = Date.parse(SourceTime);
    let CTime = Date.parse(CompareTime);
    if (CTime.valueOf() < STime.valueOf()) {
        check = 1;
    } else if (CTime.valueOf() == STime.valueOf()) {
        check = 0;
    } else if (CTime.valueOf() > STime.valueOf()) {
        check = -1;
    }
    return check;

}

