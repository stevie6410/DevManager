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
    public class DevelopmentTypesController : ApiController
    {
        private DevManagerEntities db = new DevManagerEntities();

        // GET: api/DevelopmentTypes
        public IQueryable<DevelopmentType> GetDevelopmentTypes()
        {
            return db.DevelopmentTypes;
        }

        // GET: api/DevelopmentTypes/5
        [ResponseType(typeof(DevelopmentType))]
        public async Task<IHttpActionResult> GetDevelopmentType(int id)
        {
            DevelopmentType developmentType = await db.DevelopmentTypes.FindAsync(id);
            if (developmentType == null)
            {
                return NotFound();
            }

            return Ok(developmentType);
        }

        // PUT: api/DevelopmentTypes/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutDevelopmentType(int id, DevelopmentType developmentType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != developmentType.Id)
            {
                return BadRequest();
            }

            db.Entry(developmentType).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DevelopmentTypeExists(id))
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

        // POST: api/DevelopmentTypes
        [ResponseType(typeof(DevelopmentType))]
        public async Task<IHttpActionResult> PostDevelopmentType(DevelopmentType developmentType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.DevelopmentTypes.Add(developmentType);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = developmentType.Id }, developmentType);
        }

        // DELETE: api/DevelopmentTypes/5
        [ResponseType(typeof(DevelopmentType))]
        public async Task<IHttpActionResult> DeleteDevelopmentType(int id)
        {
            DevelopmentType developmentType = await db.DevelopmentTypes.FindAsync(id);
            if (developmentType == null)
            {
                return NotFound();
            }

            db.DevelopmentTypes.Remove(developmentType);
            await db.SaveChangesAsync();

            return Ok(developmentType);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DevelopmentTypeExists(int id)
        {
            return db.DevelopmentTypes.Count(e => e.Id == id) > 0;
        }
    }
}