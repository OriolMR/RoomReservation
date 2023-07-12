using Microsoft.AspNetCore.Mvc;
using RoomReservation.Models;

namespace webapi.Repositories
{
    public interface IMeetingRoomsController
    {
        Task<IActionResult> GetAllRooms();
        Task<IActionResult> GetRoomById(int id);
        Task<IActionResult> GetMeetingRoomsByOfficeId(int officeId);
        Task<IActionResult> AddRoom([FromBody] MeetingRoom room);
        Task<IActionResult> UpdateRoom(int id, [FromBody] MeetingRoom room);
        Task<IActionResult> DeleteRoom(int id);
    }
}
