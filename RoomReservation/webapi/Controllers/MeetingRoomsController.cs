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
        private readonly IRoomReservationDbContext roomReservationDbContext;

        public MeetingRoomsController(IRoomReservationDbContext roomReservationDbContext)
        {
            this.roomReservationDbContext = roomReservationDbContext;
        }

        // GET: api/Rooms
        [HttpGet]
        public async Task<IActionResult> GetAllRooms()
        {
            var rooms = await roomReservationDbContext.MeetingRooms.ToListAsync();

            return Ok(rooms);
        }

        // GET: api/Rooms/{id}
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetRoomById([FromRoute] int id)
        {
            var room = await roomReservationDbContext.MeetingRooms.FirstOrDefaultAsync(x => x.meetingRoomId == id);

            if (room != null)
            {
                return Ok(room);
            }

            return NotFound();
        }

        // POST: api/Rooms
        [HttpPost]
        public async Task<IActionResult> AddRoom([FromBody] MeetingRoom room)
        {
            room.meetingRoomId = 0; // Asignar valor inicial a roomId
            await roomReservationDbContext.MeetingRooms.AddAsync(room);
            await roomReservationDbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRoomById), new { id = room.meetingRoomId }, room);
        }

        // PUT: api/Rooms/{id}
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateRoom(int id, [FromBody] MeetingRoom room)
        {
            var existingRoom = await roomReservationDbContext.MeetingRooms.FirstOrDefaultAsync(x => x.meetingRoomId == id);

            if (existingRoom != null)
            {
                existingRoom.meetingRoomName = room.meetingRoomName;
                existingRoom.officeId = room.officeId;
                await roomReservationDbContext.SaveChangesAsync();

                return Ok(existingRoom);
            }

            return NotFound();
        }

        // DELETE: api/Rooms/{id}
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteRoom(int id)
        {
            var room = await roomReservationDbContext.MeetingRooms.FindAsync(id);

            if (room != null)
            {
                roomReservationDbContext.MeetingRooms.Remove(room);
                await roomReservationDbContext.SaveChangesAsync();

                return NoContent();
            }

            return NotFound();
        }
    }
}


