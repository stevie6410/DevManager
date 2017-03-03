using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevManager.SqlServer.Deployments.Interfaces
{
    public interface ISqlObjectDependency
    {
        Int32 DependencyLevel { get; set; }
        string Database { get; set; }
        string Schema { get; set; }
        string ObjectName { get; set; }
        Int32 ObjectId { get; set; }
        string ObjectType { get; set; }
        string ObjectTypeDescription { get; set; }
    }
}
