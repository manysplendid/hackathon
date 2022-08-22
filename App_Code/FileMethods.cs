using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;

/// <summary>
/// FileControl 的摘要描述
/// </summary>
namespace FileControls
{
    public class FileControl
    {
        internal void inputlog(string mas, string FileName)
        {
            //LOG檔紀錄
            FileInfo log = new FileInfo(Path.GetFullPath(FileName));
            StreamWriter sw = log.AppendText();
            sw.Write(mas + "\n");
            sw.Flush();
            sw.Close();
        }
        public void InputNewData(string mas, string FileName)
        {
            //LOG檔紀錄
            FileInfo log = new FileInfo(Path.GetFullPath(FileName));
            StreamWriter sw = log.CreateText();
            sw.Write(mas + "\n");
            sw.Flush();
            sw.Close();
        }
 


        public List<string> ReadInput(string fn)
        {
            List<string> result = new List<string>();
            if (!File.Exists(fn))
            {
                Console.WriteLine("沒有{0}請檢查檔案", fn);
                return null;
            }

            StreamReader sr = new StreamReader(fn);
            string s;
            while (sr.Peek() > 0)
            {
                s = sr.ReadLine();
                if (s.IndexOf("*") >= 0) continue;

                //List<string> line = read_strings(s);
                result.Add(s);
            }
            sr.Close();
            return result;
        }
        internal List<string> read_strings(string str, char[] Splitchar)
        {
            string tmpstr = str.Trim(); // trim blanks from left and right
            string[] line = str.Split(Splitchar);
            List<string> numbers = new List<string>();
            numbers.Clear();
            foreach (string s in line)
            {
                if (s != "") numbers.Add(s);
            }
            return numbers;
        }

        

        public void delete_file(string path)
        {
            // Delete the file if it exists.
            if (File.Exists(path))
            {
                // Note that no lock is put on the
                // file and the possibility exists
                // that another process could do
                // something with it between
                // the calls to Exists and Delete.
                File.Delete(path);
            }
        }

        public static string readurlAllString(Uri Url) {
            
            WebClient wc = new WebClient();
            Stream stream = wc.OpenRead(Url);
            StreamReader streamReader = new StreamReader(stream);
            string str = streamReader.ReadToEnd();
            return str;
        }


        public static List<string> readurl(Uri Url)
        {
            List<string> result = new List<string>();
            WebClient client = new WebClient();
            Stream data = client.OpenRead(Url);
            StreamReader sr = new StreamReader(data);
            string s;
            while (!((s = sr.ReadLine()) == null))
            {
                //s = sr.ReadLine();
                //if (s.IndexOf("*") >= 0) continue;

                //List<string> line = read_strings(s);
                result.Add(s);

            }
            sr.Close();
            return result;
        }


        public static bool CheckUrlExists(string url)
        {
            // If the url does not contain Http. Add it.
            try
            {
                var request = WebRequest.Create(url) as HttpWebRequest;
                request.Method = "HEAD";
                using (var response = (HttpWebResponse)request.GetResponse())
                {
                    return response.StatusCode == HttpStatusCode.OK;
                }
            }
            catch
            {
                return false;
            }
        }
    }
}