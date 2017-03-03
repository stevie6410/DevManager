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

namespace DevManager.WebApi.Controllers
{
    public class DeployPackagesController : ApiController
    {
        private DevManagerEntities db = new DevManagerEntities();

        // GET: api/DeployPackages
        public IQueryable<DeployPackage> GetDeployPackages()
        {
            return db.DeployPackages;
        }

        // GET: api/DeployPackages/5
        [ResponseType(typeof(DeployPackage))]
        public async Task<IHttpActionResult> GetDeployPackage(int id)
        {
            DeployPackage deployPackage = await db.DeployPackages
                .Include("DbObjects")
                .Include("SSRSReports")
                .Include("Deployments")
                .Include("Deployments.EnvironmentTo")
                .Include("Deployments.DeployPackageEvents")
                .Where(x => x.Id == id)
                .FirstOrDefaultAsync();

            if (deployPackage == null)
            {
                return NotFound();
            }

            return Ok(deployPackage);
        }

        // PUT: api/DeployPackages/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutDeployPackage(int id, DeployPackage deployPackage)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != deployPackage.Id)
            {
                return BadRequest();
            }

            db.Entry(deployPackage).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DeployPackageExists(id))
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

        // POST: api/DeployPackages
        [ResponseType(typeof(DeployPackage))]
        public async Task<IHttpActionResult> PostDeployPackage(DeployPackage deployPackage)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.DeployPackages.Add(deployPackage);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = deployPackage.Id }, deployPackage);
        }

        // DELETE: api/DeployPackages/5
        [ResponseType(typeof(DeployPackage))]
        public async Task<IHttpActionResult> DeleteDeployPackage(int id)
        {
            DeployPackage deployPackage = await db.DeployPackages.FindAsync(id);
            if (deployPackage == null)
            {
                return NotFound();
            }

            db.DeployPackages.Remove(deployPackage);
            await db.SaveChangesAsync();

            return Ok(deployPackage);
        }
        
        // GET: api/Depl

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DeployPackageExists(int id)
        {
            return db.DeployPackages.Count(e => e.Id == id) > 0;
        }
    }
}