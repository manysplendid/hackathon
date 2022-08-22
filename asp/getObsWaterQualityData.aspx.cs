using FileControls;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ApiMethods;
using Newtonsoft.Json.Linq;
using dataTemplate;
public partial class asp_getObsWaterQualityData : System.Web.UI.Page
{

    protected void Page_Load(object sender, EventArgs e)
    {



        DateTime initDateTime =Convert.ToDateTime(Request["initDateTime"]);//
        int hrs = 12;
        Dictionary<string, station> stations = new Dictionary<string, station>();
        for (int i = -48; i < hrs; i++) {
            
            try
            {
                DateTime dateTime = initDateTime.AddHours(-i);
                Uri uri = new Uri(string.Format("http://211.23.167.210/obswaterQuality/{0}.json", dateTime.ToString("yyyyMMddTHHmm")));
                JObject jsonObject = ApiMethod.GetJObjectData(uri);
                IList<string> keys = jsonObject.Properties().Select(p => p.Name).ToList();
                foreach (string key in keys)
                {
                    if (!stations.ContainsKey(key))
                    {
                        stations.Add(key, new station()
                        {
                            dateTimes = new List<string>(),
                            DOs = new List<double>()
                        });
                    }
                    stations[key].dateTimes.Add(dateTime.ToString("yyyy/MM/dd HH:mm"));
                    stations[key].DOs.Add(Convert.ToDouble(jsonObject[key]["DO溶氧"]));
                }
            }
            catch { 
                
            }
            
        }


        Response.Write(JsonConvert.SerializeObject(stations));
    }
}