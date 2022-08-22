//取得用get傳遞之網址列資訊(Query String)
//http://blog.xuite.net/ahdaa/blog1/31825228-%5BJavaScript%5D%E5%8F%96%E5%BE%97%E7%94%A8get%E5%82%B3%E9%81%9E%E4%B9%8B%E7%B6%B2%E5%9D%80%E5%88%97%E8%B3%87%E8%A8%8A%28Query+String%29
//http://jquery-howto.blogspot.com/2009/09/get-url-parameters-values-with-jquery.html
/*
location.href     // 完整的網址
location.protocol // 協定　　　　　　 http:
location.hostname // 伺服器名稱　　　 blog.xuite.net
location.host     // 伺服器:埠號　　　blog.xuite.net:80
location.port     // 埠號　　　　　　 80
location.pathname // host之後的部份  /ahdaa/blog1/test.html?id=AD&val1=02&val2=22#achorAD
location.search   // 含?之後所有字串　?id=AD&val1=02&val2=22#achorAD
location.hash     // 含#之後所有字串　#achorAD(通常用於錨點)
*/
function getUrlVars() {
    var vars = [];
    var hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0 ; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}