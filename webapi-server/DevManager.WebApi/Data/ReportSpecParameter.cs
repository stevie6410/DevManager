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
    
    public partial class ReportSpecParameter
    {
        public int Id { get; set; }
        public string ParameterName { get; set; }
        public string OptionalRequired { get; set; }
        public string DefaultValue { get; set; }
        public string SingleOrMultiValue { get; set; }
        public bool AllowWildcards { get; set; }
        public int ReportSpecificationId { get; set; }
    
        public virtual ReportSpecHeader ReportSpecHeader { get; set; }
    }
}
