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
    public class ReportSpecSourceDataController : ApiController
    {
        private DevManagerEntities db = new DevManagerEntities();

        // GET: api/ReportSpecSourceData
        public IQueryable<ReportSpecSourceData> GetReportSpecSourceDatas()
        {
            return db.ReportSpecSourceDatas;
        }

        // GET: api/ReportSpecSourceData/5
        [ResponseType(typeof(ReportSpecSourceData))]
        public async Task<IHttpActionResult> GetReportSpecSourceData(int id)
        {
            ReportSpecSourceData reportSpecSourceData = await db.ReportSpecSourceDatas.FindAsync(id);
            if (reportSpecSourceData == null)
            {
                return NotFound();
            }

            return Ok(reportSpecSourceData);
        }

        // PUT: api/ReportSpecSourceData/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutReportSpecSourceData(int id, ReportSpecSourceData reportSpecSourceData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != reportSpecSourceData.Id)
            {
                return BadRequest();
            }

            db.Entry(reportSpecSourceData).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReportSpecSourceDataExists(id))
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

        // POST: api/ReportSpecSourceData
        [ResponseType(typeof(ReportSpecSourceData))]
        public async Task<IHttpActionResult> PostReportSpecSourceData(ReportSpecSourceData reportSpecSourceData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ReportSpecSourceDatas.Add(reportSpecSourceData);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = reportSpecSourceData.Id }, reportSpecSourceData);
        }

        // DELETE: api/ReportSpecSourceData/5
        [ResponseType(typeof(ReportSpecSourceData))]
        public async Task<IHttpActionResult> DeleteReportSpecSourceData(int id)
        {
            ReportSpecSourceData reportSpecSourceData = await db.ReportSpecSourceDatas.FindAsync(id);
            if (reportSpecSourceData == null)
            {
                return NotFound();
            }

            db.ReportSpecSourceDatas.Remove(reportSpecSourceData);
            await db.SaveChangesAsync();

            return Ok(reportSpecSourceData);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ReportSpecSourceDataExists(int id)
        {
            return db.ReportSpecSourceDatas.Count(e => e.Id == id) > 0;
        }
    }
}