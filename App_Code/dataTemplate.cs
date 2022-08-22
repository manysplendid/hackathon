using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace dataTemplate
{
    /// <summary>
    /// cwbstation 氣象局資料
    /// </summary>
    public class cwbstation
    {
        public string name { get; set; }
        public string code { get; set; }
        public double lat { get; set; }
        public double lng { get; set; }
        public string dateTime { get; set; }
        public double temp { get; set; }
        public double humd { get; set; }
    }
    /// <summary>
    /// station 水質測站
    /// </summary>
    public class station
    {

        public List<string> dateTimes { get; set; }
        public List<double> BODs { get; set; }
        public List<double> DOs { get; set; }
        public List<double> RPIs { get; set; }

    }
    /// <summary>
    /// 斷面資料
    /// </summary>
    public class Section
    {
        public string name { get; set; }
        public List<List<double>> coordinates { get; set; }
        public List<string> villages { get; set; }
    }
}