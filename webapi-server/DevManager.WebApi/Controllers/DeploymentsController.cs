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
using DevManager.SqlServer.Deployments;
using DevManager.SqlServer.Deployments.Models;
using DevManager.SqlServer.Deployments.Interfaces;
using System.Web.Helpers;
using Newtonsoft.Json;
using System.Text;

namespace DevManager.WebApi.Controllers
{
    public class DeploymentsController : ApiController
    {
        private DevManagerEntities db = new DevManagerEntities();

        // GET: api/Deployments
        public IQueryable<Deployment> GetDeployments()
        {
            return db.Deployments;
        }

        // GET: api/Deployments/5
        [ResponseType(typeof(Deployment))]
        public async Task<IHttpActionResult> GetDeployment(int id)
        {
            Deployment deployment = await db.Deployments.FindAsync(id);
            if (deployment == null)
            {
                return NotFound();
            }

            return Ok(deployment);
        }

        // PUT: api/Deployments/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutDeployment(int id, Deployment deployment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != deployment.Id)
            {
                return BadRequest();
            }

            db.Entry(deployment).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DeploymentExists(id))
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

        // POST: api/Deployments
        [ResponseType(typeof(Deployment))]
        public async Task<IHttpActionResult> PostDeployment(Deployment deployment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Deployments.Add(deployment);
            await db.SaveChangesAsync();
            var newDeployment = db.Deployments
                .Include("EnvironmentTo")
                .Where(x => x.Id == deployment.Id)
                .FirstOrDefault();

            return CreatedAtRoute("DefaultApi", new { id = deployment.Id }, newDeployment);
        }

        // POST: api/Deployments/Deploy
        [ResponseType(typeof(Deployment))]
        [Route("api/deployments/{id}/deploy")]
        [HttpPost]
        public IHttpActionResult RunDeployment(int id)
        {
            //Get the deployment
            var deployment = db.Deployments
                .Include("EnvironmentTo")
                .Include("DeployPackage")
                .Include("DeployPackage.DBObjects")
                .Where(x => x.Id == id)
                .FirstOrDefault();

            if (deployment == null)
                return NotFound();

            if (deployment.DeployPackage == null)
                return NotFound();

            if (deployment.DeployPackage.DBObjects == null)
                return NotFound();

            var dbObjects = new List<IDbObject>();

            foreach (var obj in deployment.DeployPackage.DBObjects)
            {
                dbObjects.Add(new DbObject()
                {
                    DatabaseName = obj.DatabaseName,
                    SchemaName = obj.SchemaName,
                    ObjectName = obj.ObjectName,
                    DeployType = obj.LastEventType,
                    ObjectType = obj.ObjectType,
                    DeployPackageDBObjectId = obj.DeployPackage.Id,
                    Script = obj.LastEventDDL,
                    DeployOrder = obj.DeployOrder
                });
            }

            var sqlConfig = new SqlConnectionConfiguration(deployment.EnvironmentTo.ServerName, deployment.EnvironmentTo.DatabaseName);
            var sqlDeploy = new SqlDeploy(sqlConfig, dbObjects);

            StringBuilder sb = new StringBuilder();

            try
            {
                sqlDeploy.DeployToTarget();
            }
            catch (Exception)
            {
                deployment.Status = "Failed";
                deployment.DeployedBy = "Steve Kent";
                deployment.DeployedOn = DateTime.Now;
                //Add the eventlog to the package events
                foreach (var msg in sqlDeploy.EventLog)
                    sb.AppendLine(msg);
                deployment.DeployPackageEvents.Add(new DeployPackageEvent() { Message = sb.ToString(), Timestamp = DateTime.Now });
                db.SaveChanges();
                return Ok(deployment);
            }
            
            //Add the eventlog to the package events
            foreach (var msg in sqlDeploy.EventLog)
                sb.AppendLine(msg);
            
            deployment.DeployPackageEvents.Add(new DeployPackageEvent() { Message = sb.ToString(), Timestamp = DateTime.Now });
            deployment.Status = "Complete";
            deployment.DeployedBy = "Steve Kent";
            deployment.DeployedOn = DateTime.Now;

            db.SaveChanges();
            return Ok(deployment);
        }

        // DELETE: api/Deployments/5
        [ResponseType(typeof(Deployment))]
        public async Task<IHttpActionResult> DeleteDeployment(int id)
        {
            Deployment deployment = await db.Deployments.FindAsync(id);
            if (deployment == null)
            {
                return NotFound();
            }

            foreach (var e in deployment.DeployPackageEvents)
            {
                db.DeployPackageEvents.Remove(e);
            }
            db.Deployments.Remove(deployment);

            try
            {

            await db.SaveChangesAsync();
            }
            catch (Exception ex)
            {

                throw;
            }

            return Ok(deployment);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DeploymentExists(int id)
        {
            return db.Deployments.Count(e => e.Id == id) > 0;
        }
    }
}