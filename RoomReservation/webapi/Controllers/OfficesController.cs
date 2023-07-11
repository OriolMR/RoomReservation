using RoomReservation.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.DataAccess;
using webapi.Repositories;

namespace RoomReservation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OfficesController : ControllerBase, IOfficesController
    {
        private readonly RoomReservationDbContext roomReservationDbContext;

        public OfficesController(RoomReservationDbContext roomReservationRepository)
        {
            this.roomReservationDbContext = roomReservationRepository;
        }

        // GET: api/Offices
        [HttpGet]
        public async Task<IActionResult> GetAllOffices()
        {
            var offices = await roomReservationDbContext.Offices.ToListAsync();

            return Ok(offices);
        }

        // GET: api/Offices/{id}
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetOfficeById([FromRoute] int id)
        {
            var office = await roomReservationDbContext.Offices.FirstOrDefaultAsync(x => x.officeId == id);

            if (office != null)
            {
                return Ok(office);
            }

            return NotFound();
        }

        // GET: api/Offices/getOfficesByCityId/{cityId}
        [HttpGet("getOfficesByCityId/{cityId:int}")]
        public async Task<IActionResult> GetOfficesByCityId(int cityId)
        {
            var offices = await roomReservationDbContext.Offices.Where(x => x.cityId == cityId).ToListAsync();

            if (offices != null && offices.Count > 0)
            {
                return Ok(offices);
            }

            return NotFound();
        }

        // POST: api/Offices
        [HttpPost]
        public async Task<IActionResult> AddOffice([FromBody] Office office)
        {
            office.officeId = 0; // Asignar valor inicial a OfficeId
            await roomReservationDbContext.Offices.AddAsync(office);
            await roomReservationDbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOfficeById), new { id = office.officeId }, office);
        }

        // PUT: api/Offices/{id}
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateOffice(int id, [FromBody] Office office)
        {
            var existingOffice = await roomReservationDbContext.Offices.FirstOrDefaultAsync(x => x.officeId == id);

            if (existingOffice != null)
            {
                existingOffice.officeName = office.officeName;
                existingOffice.cityId = office.cityId;
                await roomReservationDbContext.SaveChangesAsync();

                return Ok(existingOffice);
            }

            return NotFound();
        }

        // DELETE: api/Offices/{id}
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteOffice(int id)
        {
            var office = await roomReservationDbContext.Offices.FindAsync(id);

            if (office != null)
            {
                roomReservationDbContext.Offices.Remove(office);
                await roomReservationDbContext.SaveChangesAsync();

                return NoContent();
            }

            return NotFound();
        }
    }
}
