using System;
using System.Data;
using System.Data.SqlClient;

namespace mssqlutils
{
    public class mssqlutil
    {
        internal static SqlConnection Connect { set; get; }
        internal static SqlCommand Command { set; get; }
        internal static SqlDataAdapter DataAdapter { set; get; }
        internal static string Message { set; get; }

        public static DataTable startCommandQuery()
        {

            DataTable dataTable = new DataTable();
            try
            {
                Command.Prepare();
                DataAdapter = new SqlDataAdapter();
                DataAdapter.SelectCommand = Command;
                DataAdapter.Fill(dataTable);
            }
            catch (Exception e)
            {
                //dataTable = new DataTable;
                throw new Exception();

                
            }
            finally
            {
                clearCommandParameters();
                closeConnect();
            }
            return dataTable;
        }

        public static void setCommandParameter(string key, string value)
        {
            //Console.WriteLine(string.Format("key:{0}  value:{1}", key, value));
            try
            {
                Command.Parameters.Add("@" + key,SqlDbType.VarChar,50).Value = value;
            }
            catch (Exception ex)
            {
                Message += ex.Message;
            
            }

        }

        public static void clearCommandParameters()
        {
            Command.Parameters.Clear();
        }

        public static void setSqlCommand(string sql)
        {
            try
            {
                Command = new SqlCommand(sql, Connect);
            }
            catch (Exception ex)
            {
                Message += ex.Message;
                Console.WriteLine(ex.Message);
                closeConnect();
            }
        }

        public static void openConnect(string connectString)
        {
           
            try
            {
                Connect = new SqlConnection(connectString);
                Connect.Open();
            }
            catch (SqlException ex)
            {
                switch (ex.Number)
                {
                    case 0:
                      
                        Message += "Cannot connect to server.  Contact administrator";
                     
                        break;
                    case 1045:
                        
                        Message += "Invalid username/password, please try again";
                       
                        break;
                }
            }

        }

        internal static void closeConnect()
        {
            SqlConnection.ClearPool(Command.Connection);
            SqlConnection.ClearAllPools();
            Connect.Close();
        }
    }
}
