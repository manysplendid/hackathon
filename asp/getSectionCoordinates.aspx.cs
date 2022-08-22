using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using mssqlutils;
using Newtonsoft.Json;
using dataTemplate;

public partial class asp_getSectionCoordinates : System.Web.UI.Page
{
    
    protected void Page_Load(object sender, EventArgs e)
    {
        string connectString = "server=211.23.167.210;uid=manysplendid;pwd=27084260;database=Y2022";
        mssqlutil.openConnect(connectString);
        string sql = "SELECT a.Section_ID,a.L_TM67_X,a.L_TM67_Y,a.R_TM67_X,a.R_TM67_Y,b.L_County,b.R_County FROM dbo.Cross_Section_geography_show AS a , dbo.Cross_Section_administration AS b WHERE a.Section_ID = b.Section_ID";
        mssqlutil.setSqlCommand(sql);
        DataTable dataTable = new DataTable();
        dataTable = mssqlutil.startCommandQuery();
        List<Section> sections = new List<Section>();
        for (int i = 0;i < dataTable.Rows.Count;i++ )
        {
            string name = dataTable.Rows[i].ItemArray[0].ToString();
            double L_TM67_X = 0.0;
            double L_TM67_Y = 0.0;
            double R_TM67_X = 0.0;
            double R_TM67_Y = 0.0;
            double.TryParse(dataTable.Rows[i].ItemArray[1].ToString(), out L_TM67_X);
            double.TryParse(dataTable.Rows[i].ItemArray[2].ToString(), out L_TM67_Y);
            double.TryParse(dataTable.Rows[i].ItemArray[3].ToString(), out R_TM67_X);
            double.TryParse(dataTable.Rows[i].ItemArray[4].ToString(), out R_TM67_Y);
            string LVillage = dataTable.Rows[i].ItemArray[5].ToString();
            string RVillage = dataTable.Rows[i].ItemArray[6].ToString();
            List<string> villages = new List<string>() { LVillage, RVillage };


            List<double> leftCoord = new List<double>() { L_TM67_X , L_TM67_Y};
            List<double> rightCoord = new List<double>() { R_TM67_X, R_TM67_Y};
            List<List<double>> topCoord = new List<List<double>>() { leftCoord, rightCoord };
            Section section = new Section() { 
                name = name,
                coordinates= topCoord,
                 villages = villages
            };
            sections.Add(section);
        }

        Response.Write(JsonConvert.SerializeObject(sections));
    }
}