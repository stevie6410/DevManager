using DevManager.SqlServer.Deployments.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevManager.SqlServer.Deployments.Models
{
    public class DbObject : IDbObject
    {
        public string DatabaseName { get; set; }
        public string SchemaName { get; set; }
        public string ObjectName { get; set; }
        public string DeployType { get; set; }
        public string ObjectType { get; set; }
        public int DeployPackageDBObjectId { get; set; }
        public string Script { get; set; }
        public int DeployOrder { get; set; }
        public string TwoPartName
        {
            get
            {
                return string.Format("[{0}].[{1}]", SchemaName, ObjectName);
            }
        }
    }
}
