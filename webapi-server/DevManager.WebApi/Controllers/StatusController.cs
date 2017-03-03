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
    public class StatusController : ApiController
    {
        private DevManagerEntities db = new DevManagerEntities();

        // GET: api/Status
        public IQueryable<RequestStatusSet> GetRequestStatusSets()
        {
            return db.RequestStatusSets;
        }

        // GET: api/Status/5
        [ResponseType(typeof(RequestStatusSet))]
        public async Task<IHttpActionResult> GetRequestStatusSet(int id)
        {
            RequestStatusSet requestStatusSet = await db.RequestStatusSets.FindAsync(id);
            if (requestStatusSet == null)
            {
                return NotFound();
            }

            return Ok(requestStatusSet);
        }

        // PUT: api/Status/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutRequestStatusSet(int id, RequestStatusSet requestStatusSet)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != requestStatusSet.Id)
            {
                return BadRequest();
            }

            db.Entry(requestStatusSet).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RequestStatusSetExists(id))
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

        // POST: api/Status
        [ResponseType(typeof(RequestStatusSet))]
        public async Task<IHttpActionResult> PostRequestStatusSet(RequestStatusSet requestStatusSet)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.RequestStatusSets.Add(requestStatusSet);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = requestStatusSet.Id }, requestStatusSet);
        }

        // DELETE: api/Status/5
        [ResponseType(typeof(RequestStatusSet))]
        public async Task<IHttpActionResult> DeleteRequestStatusSet(int id)
        {
            RequestStatusSet requestStatusSet = await db.RequestStatusSets.FindAsync(id);
            if (requestStatusSet == null)
            {
                return NotFound();
            }

            db.RequestStatusSets.Remove(requestStatusSet);
            await db.SaveChangesAsync();

            return Ok(requestStatusSet);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RequestStatusSetExists(int id)
        {
            return db.RequestStatusSets.Count(e => e.Id == id) > 0;
        }
    }
}