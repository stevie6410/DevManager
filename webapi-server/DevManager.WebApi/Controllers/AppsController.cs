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
    public class AppsController : ApiController
    {
        private DevManagerEntities db = new DevManagerEntities();

        // GET: api/Apps
        public IQueryable<App> GetApps()
        {
            return db.Apps;
        }

        // GET: api/Apps/5
        [ResponseType(typeof(App))]
        public async Task<IHttpActionResult> GetApp(int id)
        {
            App app = await db.Apps.FindAsync(id);
            if (app == null)
            {
                return NotFound();
            }

            return Ok(app);
        }

        // PUT: api/Apps/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutApp(int id, App app)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != app.Id)
            {
                return BadRequest();
            }

            db.Entry(app).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AppExists(id))
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

        // POST: api/Apps
        [ResponseType(typeof(App))]
        public async Task<IHttpActionResult> PostApp(App app)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Apps.Add(app);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = app.Id }, app);
        }

        // DELETE: api/Apps/5
        [ResponseType(typeof(App))]
        public async Task<IHttpActionResult> DeleteApp(int id)
        {
            App app = await db.Apps.FindAsync(id);
            if (app == null)
            {
                return NotFound();
            }

            db.Apps.Remove(app);
            await db.SaveChangesAsync();

            return Ok(app);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AppExists(int id)
        {
            return db.Apps.Count(e => e.Id == id) > 0;
        }
    }
}