using DevManager.SqlServer.Deployments.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevManager.SqlServer.Deployments.Models
{
    public class SqlObjectDependency : ISqlObjectDependency
    {
        public Int32 DependencyLevel { get; set; }
        public string Database { get; set; }
        public string Schema { get; set; }
        public string ObjectName { get; set; }
        public Int32 ObjectId { get; set; }
        public string ObjectType { get; set; }
        public string ObjectTypeDescription { get; set; }
    }
}
