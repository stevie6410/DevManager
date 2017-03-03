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
    public class DevelopersController : ApiController
    {
        private DevManagerEntities db = new DevManagerEntities();

        // GET: api/Developers
        public IQueryable<Developer> GetDevelopers()
        {
            return db.Developers;
        }

        // GET: api/Developers/5
        [ResponseType(typeof(Developer))]
        public async Task<IHttpActionResult> GetDeveloper(int id)
        {
            Developer developer = await db.Developers.FindAsync(id);
            if (developer == null)
            {
                return NotFound();
            }

            return Ok(developer);
        }

        // PUT: api/Developers/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutDeveloper(int id, Developer developer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != developer.Id)
            {
                return BadRequest();
            }

            db.Entry(developer).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DeveloperExists(id))
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

        // POST: api/Developers
        [ResponseType(typeof(Developer))]
        public async Task<IHttpActionResult> PostDeveloper(Developer developer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Developers.Add(developer);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = developer.Id }, developer);
        }

        // DELETE: api/Developers/5
        [ResponseType(typeof(Developer))]
        public async Task<IHttpActionResult> DeleteDeveloper(int id)
        {
            Developer developer = await db.Developers.FindAsync(id);
            if (developer == null)
            {
                return NotFound();
            }

            db.Developers.Remove(developer);
            await db.SaveChangesAsync();

            return Ok(developer);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DeveloperExists(int id)
        {
            return db.Developers.Count(e => e.Id == id) > 0;
        }
    }
}