using RoomReservation.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.DataAccess;

namespace RoomReservation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MeetingRoomsController : ControllerBase
    {
        private readonly ReservationsDbContext reservationsDbContext;

        public MeetingRoomsController(ReservationsDbContext reservationsDbContext)
        {
            this.reservationsDbContext = reservationsDbContext;
        }
    
        [HttpGet]
        public async Task<IActionResult> GetAllRooms()
        {
            var rooms = await reservationsDbContext
                            .MeetingRooms
                            .ToListAsync();

            return Ok(rooms);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetRoomById([FromRoute] int id)
        {
            var room = await reservationsDbContext
                           .MeetingRooms
                           .FirstOrDefaultAsync(x => x.meetingRoomId == id);

            if (room != null)
            {
                return Ok(room);
            }

            return NotFound();
        }

        // GET: api/Rooms/getMeetingRoomsByOfficeId/{officeId}
        [HttpGet("getMeetingRoomsByOfficeId/{officeId:int}")]
        public async Task<IActionResult> GetMeetingRoomsByOfficeId(int officeId)
        {
            var meetingRooms = await reservationsDbContext
                                   .MeetingRooms
                                   .Where(x => x.officeId == officeId)
                                   .ToListAsync();

            if (meetingRooms != null && meetingRooms.Count > 0)
            {
                return Ok(meetingRooms);
            }

            return NotFound();
        }

        // GET: api/MeetingRooms/ByCapacity/{capacity}
        [HttpGet("meetingRooms/{capacity}")]
        public async Task<ActionResult<IEnumerable<MeetingRoom>>> GetMeetingRoomsByCapacity(int capacity)
        {
            var meetingRooms = await reservationsDbContext.MeetingRooms
                .Where(x => x.capacity == capacity)
                .ToListAsync();

            if (meetingRooms != null && meetingRooms.Count > 0)
            {
                return Ok(meetingRooms);
            }

            return NotFound();
        }

        // POST: api/Rooms
        [HttpPost]
        public async Task<IActionResult> AddRoom([FromBody] MeetingRoom room)
        {
            room.meetingRoomId = 0; 

            await reservationsDbContext
                .MeetingRooms
                .AddAsync(room);

            await reservationsDbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRoomById), new { id = room.meetingRoomId }, room);
        }

        // PUT: api/Rooms/{id}
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateRoom(int id, [FromBody] MeetingRoom room)
        {
            var existingRoom = await reservationsDbContext
                                   .MeetingRooms
                                   .FirstOrDefaultAsync(x => x.meetingRoomId == id);

            if (existingRoom != null)
            {
                existingRoom.meetingRoomName = room.meetingRoomName;
                existingRoom.officeId = room.officeId;

                await reservationsDbContext.SaveChangesAsync();

                return Ok(existingRoom);
            }

            return NotFound();
        }

        // DELETE: api/Rooms/{id}
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteRoom(int id)
        {
            var room = await reservationsDbContext
                           .MeetingRooms
                           .FindAsync(id);

            if (room != null)
            {
                reservationsDbContext
                    .MeetingRooms
                    .Remove(room);

                await reservationsDbContext.SaveChangesAsync();

                return NoContent();
            }

            return NotFound();
        }
    }
}


