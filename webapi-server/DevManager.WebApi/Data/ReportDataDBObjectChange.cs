//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DevManager.WebApi.Data
{
    using System;
    using System.Collections.Generic;
    
    public partial class ReportDataDBObjectChange
    {
        public System.DateTime EventDate { get; set; }
        public string EventType { get; set; }
        public string EventDDL { get; set; }
        public string DatabaseName { get; set; }
        public string SchemaName { get; set; }
        public string Type { get; set; }
        public string ObjectName { get; set; }
        public string HostName { get; set; }
        public string IPAddress { get; set; }
        public string ProgramName { get; set; }
        public string LoginName { get; set; }
        public Nullable<System.Guid> GUID { get; set; }
        public int Id { get; set; }
    }
}
