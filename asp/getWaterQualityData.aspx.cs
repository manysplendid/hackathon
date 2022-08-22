using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using FileControls;
using Newtonsoft.Json;
using dataTemplate;
public partial class asp_getWaterQualityData : System.Web.UI.Page
{
    
 
    protected void Page_Load(object sender, EventArgs e)
    {
        List<string> riverlist = new List<string>() { "TE","KE","H" };
        DateTime initDateTime = Convert.ToDateTime(Request["initDateTime"]); 
        Uri uri = new Uri(string.Format("http://211.23.167.210/waterQualityNet/{0}_BODDO.out", initDateTime.ToString("yyyyMMddHH")));
        //Uri uri = new Uri(string.Format("http://127.0.0.1/fcstdata/ALL_TEXT/BODDO_Test3.out"));

        List<string> strings = FileControl.readurl(uri);
        Dictionary<string,Dictionary<string, station>> sections = new Dictionary<string, Dictionary<string, station>>();

        //getName
        List<string> dateTimes = new List<string>();
        List<double> BODs = new List<double>();
        List<double> DOs = new List<double>();
        for (int i = 0; i < strings.Count; i++) {//strings.Count
            List<string> datas = strings[i].Split(' ').Where(x => !string.IsNullOrEmpty(x)).ToList();
            if(datas.Count != 14) { continue; }
            string name = datas[2];
            int index = riverlist.FindIndex(x=> name.StartsWith(x));
            if (index < 0) continue;
            else
            {
                if (!sections.ContainsKey(riverlist[index])) sections.Add(riverlist[index], new Dictionary<string, station>()); 
            }


            if (!sections[riverlist[index]].ContainsKey(name))
            {
                sections[riverlist[index]].Add(name, new station
                {
                    dateTimes = new List<string>(),
                    BODs = new List<double>(),
                    DOs = new List<double>(),
                    RPIs = new List<double>()
                });
            }

            string dateTime = datas[0] + " " + datas[1];
            if (Convert.ToDateTime(dateTime) < initDateTime) continue;
            sections[riverlist[index]][name].dateTimes.Add(dateTime);
            double BOD = Convert.ToDouble(datas[6]);
            double DO = Convert.ToDouble(datas[7]);
            double RPI = (getBODScore(BOD) + getDOScore(DO)) / 2.0;
            
            sections[riverlist[index]][name].BODs.Add(BOD);
            sections[riverlist[index]][name].DOs.Add(DO);
            sections[riverlist[index]][name].RPIs.Add(RPI);
        }

        Response.Write(JsonConvert.SerializeObject(sections));
    }

    internal static double getBODScore(double value) {
        double score = 1;
        if (value <= 3.0) score = 1;
        else if (3.0 < value && value <= 4.9) score = 3;
        else if (4.9 < value && value < 15.0) score = 6;
        else if (15.0 <= value) score = 10;
        
        return score;
    }
    internal static double getDOScore(double value)
    {
        double score = 1;
        if (value < 2.0) score = 10;
        else if (2.0 <= value && value <= 4.5) score = 6;
        else if (4.5 < value && value < 6.5) score = 3;
        else if (6.5 <= value) score = 1;

        return score;
    }
}