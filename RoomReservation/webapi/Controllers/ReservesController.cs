using RoomReservation.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace RoomReservation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReservesController : ControllerBase
    {
        private readonly IRoomReservationDbContext roomReservationDbContext;

        public ReservesController(IRoomReservationDbContext roomReservationDbContext)
        {
            this.roomReservationDbContext = roomReservationDbContext;
        }

        // GET: api/Reserves
        [HttpGet]
        public async Task<IActionResult> GetAllReserves()
        {
            var reserves = await roomReservationDbContext.Reserves.ToListAsync();

            return Ok(reserves);
        }

        // GET: api/Reserves/{id}
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetReserveById([FromRoute] int id)
        {
            var reserve = await roomReservationDbContext.Reserves.FirstOrDefaultAsync(x => x.reserveId == id);

            if (reserve != null)
            {
                return Ok(reserve);
            }

            return NotFound();
        }

        // POST: api/Reserves
        [HttpPost]
        public async Task<IActionResult> AddReserve([FromBody] Reserve reserve)
        {
            reserve.reserveId = 0; // Asignar valor inicial a ReserveId
            await roomReservationDbContext.Reserves.AddAsync(reserve);
            await roomReservationDbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetReserveById), new { id = reserve.reserveId }, reserve);
        }

        // PUT: api/Reserves/{id}
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateReserve(int id, [FromBody] Reserve reserve)
        {
            var existingReserve = await roomReservationDbContext.Reserves.FirstOrDefaultAsync(x => x.reserveId == id);

            if (existingReserve != null)
            {
                existingReserve.meetingRoomId = reserve.meetingRoomId;
                existingReserve.userId = reserve.userId;
                existingReserve.reserveDate = reserve.reserveDate;
                existingReserve.startingHour = reserve.startingHour;
                existingReserve.endingHour = reserve.endingHour;
                await roomReservationDbContext.SaveChangesAsync();

                return Ok(existingReserve);
            }

            return NotFound();
        }

        // DELETE: api/Reserves/{id}
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteReserve(int id)
        {
            var reserve = await roomReservationDbContext.Reserves.FindAsync(id);

            if (reserve != null)
            {
                roomReservationDbContext.Reserves.Remove(reserve);
                await roomReservationDbContext.SaveChangesAsync();

                return NoContent();
            }

            return NotFound();
        }
    }
}

