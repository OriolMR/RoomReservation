using RoomReservation.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.DataAccess;
using webapi.Repositories;
using webapi.Models;

namespace RoomReservation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReservesController : ControllerBase, IReservesController
    {
        private readonly RoomReservationDbContext roomReservationDbContext;

        public ReservesController(RoomReservationDbContext roomReservationDbContext)
        {
            this.roomReservationDbContext = roomReservationDbContext;
        }

        // GET: api/Reserves
        [HttpGet]
        public async Task<IActionResult> GetAllReserves()
        {
            var reserves = await roomReservationDbContext
                               .Reserves
                               .ToListAsync();

            return Ok(reserves);
        }

        // GET: api/Reserves/{id}
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetReserveById(int id)
        {
            var reserve = await roomReservationDbContext
                              .Reserves
                              .FirstOrDefaultAsync(x => x.reserveId == id);

            if (reserve != null)
            {
                return Ok(reserve);
            }

            return NotFound();
        }


        // GET: api/Reserves/user/{userId}
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetReservesByUserId(string userId)
        {
            var reserves = await roomReservationDbContext
                               .Reserves
                               .Where(x => x.userId == userId)
                               .ToListAsync();

            if (reserves != null && reserves.Count > 0)
            {
                return Ok(reserves);
            }

            return NotFound();
        }

        // GET: api/Reserves/{meetingRoomId}
        [HttpGet("getReservesByMeetingRoomId/{meetingRoomId:int}")]
        public async Task<IActionResult> GetReservesByMeetingRoomId(int meetingRoomId)
        {
            var reserves = await roomReservationDbContext
                               .Reserves
                               .Where(x => x.meetingRoomId == meetingRoomId)
                               .ToListAsync();

            if (reserves != null && reserves.Count > 0)
            {
                return Ok(reserves);
            }

            return NotFound();
        }

        // POST: api/Reserves
        [HttpPost]
        public async Task<IActionResult> AddReserve([FromBody] ReserveData reserveData)
        {
            // Verificar si hay solapamiento de reservas en la base de datos
            var existingReserves = await roomReservationDbContext
                                   .Reserves
                                   .Where(r => r.meetingRoomId == reserveData.MeetingRoomId 
                                       && r.reserveDate == reserveData.ReserveDate)
                                   .ToListAsync();

            // Verificar solapamiento de reservas
            foreach (var existingReserve in existingReserves)
            {
                if ((reserveData.StartingHour >= existingReserve.startingHour 
                       && reserveData.StartingHour < existingReserve.endingHour) 
                   || (reserveData.EndingHour > existingReserve.startingHour 
                       && reserveData.EndingHour <= existingReserve.endingHour) 
                   || (reserveData.StartingHour <= existingReserve.startingHour 
                       && reserveData.EndingHour >= existingReserve.startingHour))
                {
                    return BadRequest("La reserva se solapa con otra reserva existente.");
                }
            }

            // Si no hay solapamiento de reservas, crear la nueva reserva en la base de datos
            var newReserve = new Reserve
            {
                meetingRoomId = reserveData.MeetingRoomId,
                userId = reserveData.UserId,
                reserveDate = reserveData.ReserveDate,
                startingHour = reserveData.StartingHour,
                endingHour = reserveData.EndingHour
            };

            await roomReservationDbContext
                .Reserves
                .AddAsync(newReserve);

            await roomReservationDbContext.SaveChangesAsync();

            return Ok(newReserve);
        }

        // PUT: api/Reserves/{id}
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateReserve(int id, [FromBody] UpdateReserveModel reserve)
        {
            var existingReserve = await roomReservationDbContext
                                      .Reserves
                                      .FirstOrDefaultAsync(x => x.reserveId == id);

            if (existingReserve != null)
            {
                // Realizar verificación de solapamiento de reservas
                var existingReserves = await roomReservationDbContext
                                           .Reserves
                                           .Where(r => r.meetingRoomId == reserve.MeetingRoomId 
                                               && r.reserveDate == reserve.ReserveDate
                                               && r.reserveId != id)
                                           .ToListAsync();

                foreach (var existing in existingReserves)
                {
                    if ((reserve.StartingHour >= existing.startingHour 
                            && reserve.StartingHour < existing.endingHour) 
                        || (reserve.EndingHour > existing.startingHour 
                            && reserve.EndingHour <= existing.endingHour)
                        || (reserve.StartingHour <= existing.startingHour 
                            && reserve.EndingHour >= existing.startingHour))
                    {
                        return BadRequest("La reserva se solapa con otra reserva existente.");
                    }
                }

                existingReserve.reserveDate = reserve.ReserveDate;
                existingReserve.startingHour = reserve.StartingHour;
                existingReserve.endingHour = reserve.EndingHour;

                await roomReservationDbContext.SaveChangesAsync();

                return Ok(existingReserve);
            }

            return NotFound();
        }

        // DELETE: api/Reserves/{id}
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteReserve(int id)
        {
            var reserve = await roomReservationDbContext
                .Reserves
                .FindAsync(id);

            if (reserve != null)
            {
                roomReservationDbContext
                    .Reserves
                    .Remove(reserve);

                await roomReservationDbContext.SaveChangesAsync();

                return NoContent();
            }

            return NotFound();
        }
    }
}

