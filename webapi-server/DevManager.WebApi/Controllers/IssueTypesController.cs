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
    public class IssueTypesController : ApiController
    {
        private DevManagerEntities db = new DevManagerEntities();

        // GET: api/IssueTypes
        public IQueryable<IssueType> GetIssueTypes()
        {
            return db.IssueTypes;
        }

        // GET: api/IssueTypes/5
        [ResponseType(typeof(IssueType))]
        public async Task<IHttpActionResult> GetIssueType(int id)
        {
            IssueType issueType = await db.IssueTypes.FindAsync(id);
            if (issueType == null)
            {
                return NotFound();
            }

            return Ok(issueType);
        }

        // PUT: api/IssueTypes/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutIssueType(int id, IssueType issueType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != issueType.Id)
            {
                return BadRequest();
            }

            db.Entry(issueType).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IssueTypeExists(id))
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

        // POST: api/IssueTypes
        [ResponseType(typeof(IssueType))]
        public async Task<IHttpActionResult> PostIssueType(IssueType issueType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.IssueTypes.Add(issueType);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = issueType.Id }, issueType);
        }

        // DELETE: api/IssueTypes/5
        [ResponseType(typeof(IssueType))]
        public async Task<IHttpActionResult> DeleteIssueType(int id)
        {
            IssueType issueType = await db.IssueTypes.FindAsync(id);
            if (issueType == null)
            {
                return NotFound();
            }

            db.IssueTypes.Remove(issueType);
            await db.SaveChangesAsync();

            return Ok(issueType);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool IssueTypeExists(int id)
        {
            return db.IssueTypes.Count(e => e.Id == id) > 0;
        }
    }
}