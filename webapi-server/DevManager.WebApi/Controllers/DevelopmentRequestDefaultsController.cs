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
    public class DevelopmentRequestDefaultsController : ApiController
    {
        private DevManagerEntities db = new DevManagerEntities();

        // GET: api/DevelopmentRequestDefaults
        public IQueryable<DevelopmentRequestHoursTemplate> GetDevelopmentRequestHoursTemplates()
        {
            return db.DevelopmentRequestHoursTemplates;
        }

        // GET: api/DevelopmentRequestDefaults/5
        [ResponseType(typeof(DevelopmentRequestHoursTemplate))]
        public async Task<IHttpActionResult> GetDevelopmentRequestHoursTemplate(int id)
        {
            DevelopmentRequestHoursTemplate developmentRequestHoursTemplate = await db.DevelopmentRequestHoursTemplates.FindAsync(id);
            if (developmentRequestHoursTemplate == null)
            {
                return NotFound();
            }

            return Ok(developmentRequestHoursTemplate);
        }

        // PUT: api/DevelopmentRequestDefaults/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutDevelopmentRequestHoursTemplate(int id, DevelopmentRequestHoursTemplate developmentRequestHoursTemplate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != developmentRequestHoursTemplate.Id)
            {
                return BadRequest();
            }

            db.Entry(developmentRequestHoursTemplate).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DevelopmentRequestHoursTemplateExists(id))
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

        // POST: api/DevelopmentRequestDefaults
        [ResponseType(typeof(DevelopmentRequestHoursTemplate))]
        public async Task<IHttpActionResult> PostDevelopmentRequestHoursTemplate(DevelopmentRequestHoursTemplate developmentRequestHoursTemplate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.DevelopmentRequestHoursTemplates.Add(developmentRequestHoursTemplate);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = developmentRequestHoursTemplate.Id }, developmentRequestHoursTemplate);
        }

        // DELETE: api/DevelopmentRequestDefaults/5
        [ResponseType(typeof(DevelopmentRequestHoursTemplate))]
        public async Task<IHttpActionResult> DeleteDevelopmentRequestHoursTemplate(int id)
        {
            DevelopmentRequestHoursTemplate developmentRequestHoursTemplate = await db.DevelopmentRequestHoursTemplates.FindAsync(id);
            if (developmentRequestHoursTemplate == null)
            {
                return NotFound();
            }

            db.DevelopmentRequestHoursTemplates.Remove(developmentRequestHoursTemplate);
            await db.SaveChangesAsync();

            return Ok(developmentRequestHoursTemplate);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DevelopmentRequestHoursTemplateExists(int id)
        {
            return db.DevelopmentRequestHoursTemplates.Count(e => e.Id == id) > 0;
        }
    }
}