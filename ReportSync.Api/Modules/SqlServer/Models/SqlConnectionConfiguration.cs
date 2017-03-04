using System.Data.SqlClient;

namespace ReportSync.Api.SqlServer
{
    public class SqlConnectionConfiguration
    {
        public SqlConnectionConfiguration(string targetServer, string targetDatabase)
        {
            this._targetServer = targetServer;
            this._targetDatabase = targetDatabase;
        }

        public string TargetServer { get { return _targetServer; } }
        public string TargetDatabase { get { return _targetDatabase; } }

        private string _targetServer { get; set; }
        private string _targetDatabase { get; set; }

        public string ConnectionString
        {
            get
            {
                SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder();
                builder.DataSource = _targetServer;
                builder.InitialCatalog = _targetDatabase;
                builder.IntegratedSecurity = false;
                builder.UserID = "appUser";
                builder.Password = "Password2";
                return builder.ConnectionString;
            }
        }

    }
}
