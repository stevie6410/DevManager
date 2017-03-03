using DevManager.WebApi.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DevManager.WebApi.Controllers
{
    public class DBObjectsController : ApiController
    {
        private DevManagerEntities db = new DevManagerEntities();
        
        // GET: api/DBObjects
        public IEnumerable<ReportDataDBObject> Get()
        {
            return db.ReportDataDBObjects;   
        }

        [HttpGet]
        [Route("api/DBObjects/search/{searchTerm}/{packageId}")]
        public IEnumerable<ReportDataDBObject> Search(string searchTerm, int packageId)
        {
            return db.SearchDbObjects(searchTerm, packageId).Take(100);
            //return db.ReportDataDBObjects.Where(x => x.ObjectName.Contains(searchTerm)).Take(100);
        }
        
        [HttpGet]
        [Route("api/DBObjects/{databaseName}/{schemaName}/{objectName}")]
        public ReportDataDBObject Get(string databaseName, string schemaName, string objectName)
        {
            return db.ReportDataDBObjects.Where(x => x.DatabaseName == databaseName && x.SchemaName == schemaName && x.ObjectName == objectName).FirstOrDefault();
        }

        [HttpGet]
        [Route("api/DBObjects/{schemaName}/{objectName}/changes")]
        public IEnumerable<ReportDataDBObjectChange> GetChanges(string schemaName, string objectName)
        {
            return db.ReportDataDBObjectChanges
                .Where(x => x.SchemaName == schemaName && x.ObjectName == objectName)
                .OrderBy(x => x.EventDate);
        }

        [HttpGet]
        [Route("api/DBObjects/{schemaName}/{objectName}/changes/current")]
        public ReportDataDBObjectChange GetCurrentVersion(string schemaName, string objectName)
        {
            return db.ReportDataDBObjectChanges
                .Where(x => x.SchemaName == schemaName && x.ObjectName == objectName)
                .OrderByDescending(x => x.EventDate)
                .Take(1)
                .FirstOrDefault();
        }
    }
}
