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
            var reserves = await roomReservationDbContext.Reserves.ToListAsync();

            return Ok(reserves);
        }

        // GET: api/Reserves/{id}
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetReserveById(int id)
        {
            var reserve = await roomReservationDbContext.Reserves.FirstOrDefaultAsync(x => x.reserveId == id);

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
            var reserves = await roomReservationDbContext.Reserves
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
            var reserves = await roomReservationDbContext.Reserves.Where(x => x.meetingRoomId == meetingRoomId).ToListAsync();

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
            var newReserve = new Reserve
            {
                meetingRoomId = reserveData.MeetingRoomId,
                userId = reserveData.UserId,
                reserveDate = reserveData.ReserveDate,
                startingHour = reserveData.StartingHour,
                endingHour = reserveData.EndingHour
            };

            await roomReservationDbContext.Reserves.AddAsync(newReserve);
            await roomReservationDbContext.SaveChangesAsync();

            return Ok(newReserve);
        }



        // PUT: api/Reserves/{id}
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateReserve(int id, [FromBody] UpdateReserveModel reserve)
        {
            var existingReserve = await roomReservationDbContext.Reserves.FirstOrDefaultAsync(x => x.reserveId == id);

            if (existingReserve != null)
            {
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

