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
    public class ReportSpecDataSelectionsController : ApiController
    {
        private DevManagerEntities db = new DevManagerEntities();

        // GET: api/ReportSpecDataSelections
        public IQueryable<ReportSpecDataSelection> GetReportSpecDataSelections()
        {
            return db.ReportSpecDataSelections;
        }

        // GET: api/ReportSpecDataSelections/5
        [ResponseType(typeof(ReportSpecDataSelection))]
        public async Task<IHttpActionResult> GetReportSpecDataSelection(int id)
        {
            ReportSpecDataSelection reportSpecDataSelection = await db.ReportSpecDataSelections.FindAsync(id);
            if (reportSpecDataSelection == null)
            {
                return NotFound();
            }

            return Ok(reportSpecDataSelection);
        }

        // PUT: api/ReportSpecDataSelections/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutReportSpecDataSelection(int id, ReportSpecDataSelection reportSpecDataSelection)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != reportSpecDataSelection.Id)
            {
                return BadRequest();
            }

            db.Entry(reportSpecDataSelection).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReportSpecDataSelectionExists(id))
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

        // POST: api/ReportSpecDataSelections
        [ResponseType(typeof(ReportSpecDataSelection))]
        public async Task<IHttpActionResult> PostReportSpecDataSelection(ReportSpecDataSelection reportSpecDataSelection)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ReportSpecDataSelections.Add(reportSpecDataSelection);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = reportSpecDataSelection.Id }, reportSpecDataSelection);
        }

        // DELETE: api/ReportSpecDataSelections/5
        [ResponseType(typeof(ReportSpecDataSelection))]
        public async Task<IHttpActionResult> DeleteReportSpecDataSelection(int id)
        {
            ReportSpecDataSelection reportSpecDataSelection = await db.ReportSpecDataSelections.FindAsync(id);
            if (reportSpecDataSelection == null)
            {
                return NotFound();
            }

            db.ReportSpecDataSelections.Remove(reportSpecDataSelection);
            await db.SaveChangesAsync();

            return Ok(reportSpecDataSelection);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ReportSpecDataSelectionExists(int id)
        {
            return db.ReportSpecDataSelections.Count(e => e.Id == id) > 0;
        }
    }
}