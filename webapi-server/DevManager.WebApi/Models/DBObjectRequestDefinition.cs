using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DevManager.WebApi.Models
{
    public class DBObjectRequestDefinition
    {
        public string DatabaseName { get; set; }
        public string SchemaName { get; set; }
        public string ObjectName { get; set; }
    }
}