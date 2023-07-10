using RoomReservation.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.DataAccess;

namespace RoomReservation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OfficesController : ControllerBase
    {
        private readonly IRoomReservationDbContext roomReservationRepository;

        public OfficesController(IRoomReservationDbContext roomReservationRepository)
        {
            this.roomReservationRepository = roomReservationRepository;
        }

        // GET: api/Offices
        [HttpGet]
        public async Task<IActionResult> GetAllOffices()
        {
            var offices = await roomReservationRepository.Offices.ToListAsync();

            return Ok(offices);
        }

        // GET: api/Offices/{id}
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetOfficeById([FromRoute] int id)
        {
            var office = await roomReservationRepository.Offices.FirstOrDefaultAsync(x => x.officeId == id);

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
            var offices = await roomReservationRepository.Offices.Where(x => x.cityId == cityId).ToListAsync();

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
            await roomReservationRepository.Offices.AddAsync(office);
            await roomReservationRepository.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOfficeById), new { id = office.officeId }, office);
        }

        // PUT: api/Offices/{id}
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateOffice(int id, [FromBody] Office office)
        {
            var existingOffice = await roomReservationRepository.Offices.FirstOrDefaultAsync(x => x.officeId == id);

            if (existingOffice != null)
            {
                existingOffice.officeName = office.officeName;
                existingOffice.cityId = office.cityId;
                await roomReservationRepository.SaveChangesAsync();

                return Ok(existingOffice);
            }

            return NotFound();
        }

        // DELETE: api/Offices/{id}
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteOffice(int id)
        {
            var office = await roomReservationRepository.Offices.FindAsync(id);

            if (office != null)
            {
                roomReservationRepository.Offices.Remove(office);
                await roomReservationRepository.SaveChangesAsync();

                return NoContent();
            }

            return NotFound();
        }
    }
}
