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
using RefactorThis.GraphDiff;
using JsonPatch;

namespace DevManager.WebApi.Controllers
{
    public class ReportSpecHeadersController : ApiController
    {
        private DevManagerEntities db = new DevManagerEntities();

        // GET: api/ReportSpecHeader
        public IQueryable<ReportSpecHeader> GetReportSpecHeaders()
        {
            return db.ReportSpecHeaders;
        }

        // GET: api/ReportSpecHeader/5
        [ResponseType(typeof(ReportSpecHeader))]
        public async Task<IHttpActionResult> GetReportSpecHeader(int id)
        {
            ReportSpecHeader reportSpecHeader = await db.ReportSpecHeaders
                .Include(x => x.ReportSpecSourceDatas)
                .Include(x => x.ReportSpecFilters)
                .Include(x => x.ReportSpecParameters)
                .Include(x => x.ReportSpecDataSelections)
                .SingleOrDefaultAsync(x => x.Id == id);
            if (reportSpecHeader == null)
            {
                return NotFound();
            }

            return Ok(reportSpecHeader);
        }

        // PUT: api/ReportSpecHeader/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutReportSpecHeader(int id, ReportSpecHeader reportSpecHeader)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != reportSpecHeader.Id)
            {
                return BadRequest();
            }

            db.UpdateGraph(reportSpecHeader, map => map
            .OwnedCollection(x => x.ReportSpecParameters)
            .OwnedCollection(x => x.ReportSpecFilters)
            .OwnedCollection(x => x.ReportSpecDataSelections)
            .OwnedCollection(x => x.ReportSpecSourceDatas)
            );

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReportSpecHeaderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(reportSpecHeader);
        }

        // POST: api/ReportSpecHeader
        [ResponseType(typeof(ReportSpecHeader))]
        public async Task<IHttpActionResult> PostReportSpecHeader(ReportSpecHeader reportSpecHeader)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ReportSpecHeaders.Add(reportSpecHeader);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = reportSpecHeader.Id }, reportSpecHeader);
        }

        // DELETE: api/ReportSpecHeader/5
        [ResponseType(typeof(ReportSpecHeader))]
        public async Task<IHttpActionResult> DeleteReportSpecHeader(int id)
        {
            ReportSpecHeader reportSpecHeader = await db.ReportSpecHeaders.FindAsync(id);
            if (reportSpecHeader == null)
            {
                return NotFound();
            }

            db.ReportSpecHeaders.Remove(reportSpecHeader);
            await db.SaveChangesAsync();

            return Ok(reportSpecHeader);
        }

        public void Patch(int id, JsonPatchDocument<ReportSpecHeader> patchData)
        {
            ReportSpecHeader reportSpecHeader = db.ReportSpecHeaders
               .Include(x => x.ReportSpecSourceDatas)
               .Include(x => x.ReportSpecFilters)
               .Include(x => x.ReportSpecParameters)
               .Include(x => x.ReportSpecDataSelections)
               .SingleOrDefault(x => x.Id == id);

            patchData.ApplyUpdatesTo(reportSpecHeader);

            var p = patchData;

            db.UpdateGraph(reportSpecHeader, map => map
           .OwnedCollection(x => x.ReportSpecParameters)
           .OwnedCollection(x => x.ReportSpecFilters)
           .OwnedCollection(x => x.ReportSpecDataSelections)
           .OwnedCollection(x => x.ReportSpecSourceDatas)
           );

             db.SaveChanges();

        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ReportSpecHeaderExists(int id)
        {
            return db.ReportSpecHeaders.Count(e => e.Id == id) > 0;
        }
    }
}