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
    public class SoftwarePackagesController : ApiController
    {
        private DevManagerEntities db = new DevManagerEntities();

        // GET: api/SoftwarePackages
        public IQueryable<SoftwarePackage> GetSoftwarePackages()
        {
            return db.SoftwarePackages;
        }

        // GET: api/SoftwarePackages/5
        [ResponseType(typeof(SoftwarePackage))]
        public async Task<IHttpActionResult> GetSoftwarePackage(int id)
        {
            SoftwarePackage softwarePackage = await db.SoftwarePackages.FindAsync(id);
            if (softwarePackage == null)
            {
                return NotFound();
            }

            return Ok(softwarePackage);
        }

        // PUT: api/SoftwarePackages/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutSoftwarePackage(int id, SoftwarePackage softwarePackage)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != softwarePackage.Id)
            {
                return BadRequest();
            }

            db.Entry(softwarePackage).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SoftwarePackageExists(id))
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

        // POST: api/SoftwarePackages
        [ResponseType(typeof(SoftwarePackage))]
        public async Task<IHttpActionResult> PostSoftwarePackage(SoftwarePackage softwarePackage)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.SoftwarePackages.Add(softwarePackage);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = softwarePackage.Id }, softwarePackage);
        }

        // DELETE: api/SoftwarePackages/5
        [ResponseType(typeof(SoftwarePackage))]
        public async Task<IHttpActionResult> DeleteSoftwarePackage(int id)
        {
            SoftwarePackage softwarePackage = await db.SoftwarePackages.FindAsync(id);
            if (softwarePackage == null)
            {
                return NotFound();
            }

            db.SoftwarePackages.Remove(softwarePackage);
            await db.SaveChangesAsync();

            return Ok(softwarePackage);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SoftwarePackageExists(int id)
        {
            return db.SoftwarePackages.Count(e => e.Id == id) > 0;
        }
    }
}