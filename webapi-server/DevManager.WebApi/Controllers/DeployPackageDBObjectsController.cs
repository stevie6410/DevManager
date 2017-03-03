using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using DevManager.WebApi.Data;
using DevManager.WebApi.Models;
using DevManager.SqlServer.Deployments.Interfaces;
using DevManager.SqlServer.Deployments.Models;
using DevManager.SqlServer.Deployments;

namespace DevManager.WebApi.Controllers
{
    public class DeployPackageDBObjectsController : ApiController
    {
        private DevManagerEntities db = new DevManagerEntities();

        // GET: api/DeployPackageDBObjects
        public IQueryable<DeployPackageDBObject> GetDeployPackageDBObjects()
        {
            return db.DeployPackageDBObjects;
        }

        // GET: api/DeployPackageDBObjects/5
        [ResponseType(typeof(DeployPackageDBObject))]
        public async Task<IHttpActionResult> GetDeployPackageDBObject(int id)
        {
            DeployPackageDBObject deployPackageDBObject = await db.DeployPackageDBObjects.FindAsync(id);
            if (deployPackageDBObject == null)
            {
                return NotFound();
            }

            return Ok(deployPackageDBObject);
        }

        // PUT: api/DeployPackageDBObjects/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutDeployPackageDBObject(int id, DeployPackageDBObject deployPackageDBObject)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != deployPackageDBObject.Id)
            {
                return BadRequest();
            }

            db.Entry(deployPackageDBObject).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DeployPackageDBObjectExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/DeployPackageDBObjects
        [ResponseType(typeof(DeployPackageDBObject))]
        public async Task<IHttpActionResult> PostDeployPackageDBObject(DeployPackageDBObject deployPackageDBObject)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.DeployPackageDBObjects.Add(deployPackageDBObject);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = deployPackageDBObject.Id }, deployPackageDBObject);
        }

        // Add a DbObject to the Deploy Package 
        // POST: api/DeployPackages/DbObjects
        [HttpPost]
        [Route("api/DeployPackages/{id}/DbObjects")]
        [ResponseType(typeof(DeployPackageDBObject))]
        public IHttpActionResult PostDeployPackageDbObject(int id, [FromBody] DBObjectRequestDefinition dbObj)
        {
            return Ok(AddDbObjectToPackage(id, dbObj, "Manual", 0));
        }

        // DELETE: api/DeployPackageDBObjects/5
        [HttpDelete]
        [Route("api/DeployPackageDBObjects/{id}")]
        [ResponseType(typeof(DeployPackageDBObject))]
        public async Task<IHttpActionResult> DeleteDeployPackageDBObject(int id)
        {
            DeployPackageDBObject deployPackageDBObject = await db.DeployPackageDBObjects.FindAsync(id);
            if (deployPackageDBObject == null)
            {
                return NotFound();
            }

            db.DeployPackageDBObjects.Remove(deployPackageDBObject);
            await db.SaveChangesAsync();

            return Ok(deployPackageDBObject);
        }

        // DELETE
        [HttpPost]
        [Route("api/DeployPackages/{id}/DbObjects")]
        [ResponseType(typeof(IEnumerable<DeployPackageDBObject>))]
        public async Task<IHttpActionResult> DeleteDeployPackageDBObjects(int packageId, [FromBody] DbObjectKeyRequest objectKey)
        {
            IEnumerable<DeployPackageDBObject> deployPackageDBObjects = await db.DeployPackageDBObjects.Where(x => x.DeployPackageId == packageId && x.ObjectKey == objectKey.ObjectKey).ToListAsync();
            if (deployPackageDBObjects.Count() == 0)
            {
                return NotFound();
            }

            foreach (var obj in deployPackageDBObjects)
            {
                db.DeployPackageDBObjects.Remove(obj);
            }
            await db.SaveChangesAsync();

            return Ok(deployPackageDBObjects);
        }

        // GET
        [HttpGet]
        [Route("api/DeployPackages/{id}/DBDependencies")]
        [ResponseType(typeof(IEnumerable<ISqlObjectDependency>))]
        public IHttpActionResult GetPackageDependencies(int id)
        {
            return Ok(GetDependenciesList(id));
        }

        // POST
        [HttpPost]
        [Route("api/DeployPackages/{id}/DBDependencies")]
        [ResponseType(typeof(IEnumerable<ISqlObjectDependency>))]
        public IHttpActionResult AddPackageDependencies(int id)
        {
            DeletePackageDBObjectDependencies(id);
            var results = new List<DeployPackageDBObject>();
            var deps = GetDependenciesList(id).Where(d => d.DependencyLevel > 0);

            var distinctDeps = deps
                .GroupBy(x => x.ObjectId)
                .Select(i => new
                {
                    ObjectId = i.Key,
                    DeployOrder = i.Max(row => row.DependencyLevel)
                });

            foreach (var dep in distinctDeps)
            {
                var depDetails = deps.Where(x => x.ObjectId == dep.ObjectId).OrderByDescending(x => x.DependencyLevel).FirstOrDefault();
                var res = AddDbObjectToPackage(id, new DBObjectRequestDefinition() { DatabaseName = depDetails.Database, SchemaName = depDetails.Schema, ObjectName = depDetails.ObjectName }, "AutoDependency", dep.DeployOrder);
                results.Add(res);
            }
            return Ok(results);
        }

        [HttpDelete]
        [Route("api/DeployPackages/{id}/DBDependencies")]
        [ResponseType(typeof(bool))]
        public IHttpActionResult DeletePackageDependencies(int id)
        {
            DeletePackageDBObjectDependencies(id);
            return Ok(true);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private void DeletePackageDBObjectDependencies(int packageId)
        {
            var package = db.DeployPackages.Include("DBObjects").Where(p => p.Id == packageId).FirstOrDefault();
            db.DeployPackageDBObjects.RemoveRange(package.DBObjects.Where(o => o.AttatchType == "AutoDependency"));
            db.SaveChanges();
        }

        private IEnumerable<ISqlObjectDependency> GetDependenciesList(int packageId)
        {
            //Create Sql Connection config for the Prod database (for now during development)
            var sqlConnConfig = new SqlConnectionConfiguration("DCWSAORD001P", "ReportData");

            //Get all of the DBObjects for the given package
            var deployPackage = db.DeployPackages
                .Include("DBObjects")
                .Where(dp => dp.Id == packageId)
                .FirstOrDefault();

            //Create a list of IDbDeployObject
            var objs = new List<IDbObject>();

            foreach (var obj in deployPackage.DBObjects.Where(o => o.LastEventType != "DROP"))
            {
                var newObj = new DbObject()
                {
                    DatabaseName = sqlConnConfig.TargetDatabase,
                    SchemaName = obj.SchemaName,
                    ObjectName = obj.ObjectName,
                    ObjectType = obj.ObjectType,
                    DeployPackageDBObjectId = obj.Id,
                    DeployType = "Dependency",
                    DeployOrder = obj.DeployOrder,
                    Script = string.Empty
                };
                objs.Add(newObj);
            }

            var depChecker = new SqlDependencyChecker(sqlConnConfig);
            var deps = depChecker.GetDependencies(objs);
            return deps;
        }

        private DeployPackageDBObject AddDbObjectToPackage(int packageId, DBObjectRequestDefinition dbObj, string attatchType, int deployOrder)
        {
            //Get the deploy package
            var deployPackage = db.DeployPackages.Find(packageId);
            var dbObject = db.ReportDataDBObjects.Where(x => x.DatabaseName == dbObj.DatabaseName && x.SchemaName == dbObj.SchemaName && x.ObjectName == dbObj.ObjectName).FirstOrDefault();

            var newObj = new DeployPackageDBObject()
            {
                Guid = dbObject.GUID,
                DatabaseName = dbObject.DatabaseName,
                SchemaName = dbObject.SchemaName,
                ObjectName = dbObject.ObjectName,
                LastEventType = dbObject.LastEventType,
                CreatedOn = dbObject.CreatedOn,
                CreatedBy = dbObject.CreatedBy,
                LastModifiedBy = dbObject.LastModifiedBy,
                LastModifiedOn = dbObject.LastModified.HasValue ? dbObject.LastModified.Value : DateTime.Now,
                ObjectType = dbObject.ObjectType,
                AttatchType = attatchType,
                ObjectKey = dbObject.ObjectKey,
                LastEventDDL = dbObject.LastEventDDL,
                DeployOrder = deployOrder
            };

            deployPackage.DBObjects.Add(newObj);

            db.SaveChanges();
            return newObj;
        }

        private bool DeployPackageDBObjectExists(int id)
        {
            return db.DeployPackageDBObjects.Count(e => e.Id == id) > 0;
        }
    }
}