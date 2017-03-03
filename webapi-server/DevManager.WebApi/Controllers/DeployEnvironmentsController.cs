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

namespace DevManager.WebApi.Controllers
{
    public class DeployEnvironmentsController : ApiController
    {
        private DevManagerEntities db = new DevManagerEntities();

        // GET: api/DeployEnvironments
        public IQueryable<DeployEnvironment> GetDeployEnvironments()
        {
            return db.DeployEnvironments;
        }

        // GET: api/DeployEnvironments/5
        [ResponseType(typeof(DeployEnvironment))]
        public async Task<IHttpActionResult> GetDeployEnvironment(int id)
        {
            DeployEnvironment deployEnvironment = await db.DeployEnvironments.FindAsync(id);
            if (deployEnvironment == null)
            {
                return NotFound();
            }

            return Ok(deployEnvironment);
        }

        // PUT: api/DeployEnvironments/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutDeployEnvironment(int id, DeployEnvironment deployEnvironment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != deployEnvironment.Id)
            {
                return BadRequest();
            }

            db.Entry(deployEnvironment).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DeployEnvironmentExists(id))
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

        // POST: api/DeployEnvironments
        [ResponseType(typeof(DeployEnvironment))]
        public async Task<IHttpActionResult> PostDeployEnvironment(DeployEnvironment deployEnvironment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.DeployEnvironments.Add(deployEnvironment);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = deployEnvironment.Id }, deployEnvironment);
        }

        // DELETE: api/DeployEnvironments/5
        [ResponseType(typeof(DeployEnvironment))]
        public async Task<IHttpActionResult> DeleteDeployEnvironment(int id)
        {
            DeployEnvironment deployEnvironment = await db.DeployEnvironments.FindAsync(id);
            if (deployEnvironment == null)
            {
                return NotFound();
            }

            db.DeployEnvironments.Remove(deployEnvironment);
            await db.SaveChangesAsync();

            return Ok(deployEnvironment);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DeployEnvironmentExists(int id)
        {
            return db.DeployEnvironments.Count(e => e.Id == id) > 0;
        }
    }
}