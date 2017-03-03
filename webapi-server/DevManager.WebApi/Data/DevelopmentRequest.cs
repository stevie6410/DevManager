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
    
    public partial class DevelopmentRequest
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public DevelopmentRequest()
        {
            this.AffectedDepartments = new HashSet<AffectedDepartment>();
            this.Apps = new HashSet<App>();
            this.Attachments = new HashSet<Attachment>();
            this.DevelopmentRequestHours = new HashSet<DevelopmentRequestHour>();
            this.ReportSpecHeaders = new HashSet<ReportSpecHeader>();
            this.Issues = new HashSet<Issue>();
            this.Reports = new HashSet<Report>();
        }
    
        public int Id { get; set; }
        public string Name { get; set; }
        public string UserComments { get; set; }
        public string RequestedBy { get; set; }
        public string Summary { get; set; }
        public string FrequencyOfUse { get; set; }
        public string DataSource { get; set; }
        public string Priority { get; set; }
        public string SiteSpecific { get; set; }
        public string CurrentLocation { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTimeOffset> Created { get; set; }
        public string ModifiedBy { get; set; }
        public Nullable<System.DateTimeOffset> Modified { get; set; }
        public byte[] RowVersion { get; set; }
        public Nullable<int> DeveloperId { get; set; }
        public int RequestStatusId { get; set; }
        public Nullable<int> SoftwarePackageId { get; set; }
        public string DeveloperNotes { get; set; }
        public int TypeId { get; set; }
        public Nullable<int> SystemId { get; set; }
        public Nullable<System.DateTime> TargetDate { get; set; }
        public bool SpecRequired { get; set; }
        public bool SpecComplete { get; set; }
        public Nullable<int> EstSpecHours { get; set; }
        public Nullable<int> EstDevHours { get; set; }
        public Nullable<int> EstTestingHours { get; set; }
        public Nullable<int> EstDocHours { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<AffectedDepartment> AffectedDepartments { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<App> Apps { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Attachment> Attachments { get; set; }
        public virtual Developer Developer { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DevelopmentRequestHour> DevelopmentRequestHours { get; set; }
        public virtual RequestStatusSet RequestStatusSet { get; set; }
        public virtual SoftwarePackage SoftwarePackage { get; set; }
        public virtual DevelopmentType DevelopmentType { get; set; }
        public virtual SAOSystem System { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ReportSpecHeader> ReportSpecHeaders { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Issue> Issues { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Report> Reports { get; set; }
    }
}