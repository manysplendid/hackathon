using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;

/// <summary>
/// ApiMethods 的摘要描述
/// </summary>
///     
namespace ApiMethods
{
    class tokenpara
    {

        public string username { set; get; }
        public string password { set; get; }
    }

    public static class ApiMethod
    {
        private static string Token = "";

        internal static void gettoken(Uri tokenapi, string ApiUserName, string ApiPassword)
        {

            using (WebClient wc = new WebClient())
            {
                //指定編碼
                wc.Encoding = Encoding.UTF8;
                //指定content-type Header
                wc.Headers.Add(HttpRequestHeader.ContentType, "application/json");
                wc.Headers.Add(HttpRequestHeader.Accept, "application/json");
                //post data information
                tokenpara tp = new tokenpara() { username = ApiUserName, password = ApiPassword };
                string json = JsonConvert.SerializeObject(tp);
                //start post
                var result = wc.UploadString(tokenapi, json);
                JObject outdata = JObject.Parse(result);
                Token = outdata.GetValue("token").ToString();
            }
        }
        public static JArray GetArrayDataWithToken(Uri ApiUrl)
        {
            JArray output = new JArray();
            using (WebClient wc = new WebClient())
            {
                wc.Encoding = Encoding.UTF8; // 設定Webclient.Encoding
                wc.Headers.Add(HttpRequestHeader.Authorization, string.Format("Bearer {0}", Token));
                string jstr = wc.DownloadString(ApiUrl);
                output = JArray.Parse(jstr);
            }
            return output;
        }
        public static JObject GetJObjectDataWithToken(Uri ApiUrl)
        {
            JObject output = new JObject();
            using (WebClient wc = new WebClient())
            {
                wc.Encoding = Encoding.UTF8; // 設定Webclient.Encoding
                wc.Headers.Add(HttpRequestHeader.Authorization, string.Format("Bearer {0}", Token));
                string jstr = wc.DownloadString(ApiUrl);
                output = JObject.Parse(jstr);
            }
            return output;
        }

        //if {} objects
        public static JObject GetJObjectData(Uri uri)
        {
            JObject json = new JObject();
            using (WebClient wc = new WebClient())
            {
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
                wc.Encoding = Encoding.UTF8; // 設定Webclient.Encoding
                string jstr = wc.DownloadString(uri);
                json = JObject.Parse(jstr);
            }
            return json;
        }

        //if [] JArray
        public static List<JObject> GetArrayData(Uri uri)
        {
            List<JObject> jsonobject = new List<JObject>();
            using (WebClient wc = new WebClient())
            {
                wc.Encoding = Encoding.UTF8; // 設定Webclient.Encoding
                string jstr = wc.DownloadString(uri);
                JArray jsonArray = JArray.Parse(jstr);
                jsonobject = jsonArray.OfType<JObject>().ToList();
            }
            return jsonobject;
        }
    }
}