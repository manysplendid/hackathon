using ApiMethods;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using dataTemplate;
public partial class asp_getCWBStationsData : System.Web.UI.Page
{

    protected void Page_Load(object sender, EventArgs e)
    {
        string stas = Request["stations"].ToString();
        string item = Request["item"].ToString();
        Uri uri = new Uri(string.Format("https://opendata.cwb.gov.tw/api/v1/rest/datastore/{0}?Authorization=CWB-743E3E26-A46E-49CF-AF65-90BA1804EDC7&stationId={1}&elementName=TIME,TEMP,HUMD",item,stas));
        JObject jsonObjects = ApiMethod.GetJObjectData(uri);
        List<cwbstation> stations = new List<cwbstation>();
        foreach (JObject Object in jsonObjects["records"]["location"]) {
            cwbstation station = new cwbstation();
            station.lat = Convert.ToDouble( Object["lat"]);
            station.lng = Convert.ToDouble(Object["lon"]);
            station.name = Object["locationName"].ToString();
            station.code = Object["stationId"].ToString();
            station.dateTime = Object["time"]["obsTime"].ToString();
            foreach (JObject ObjectValue in Object["weatherElement"]) {
                if (ObjectValue["elementName"].ToString() == "TEMP") station.temp = Convert.ToDouble(ObjectValue["elementValue"]);
                if (ObjectValue["elementName"].ToString() == "HUMD") station.humd = Convert.ToDouble(ObjectValue["elementValue"]);
            }
            stations.Add(station);
        }
        Response.Write(JsonConvert.SerializeObject(stations));
    }
}