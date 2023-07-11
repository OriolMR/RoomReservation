using Microsoft.AspNetCore.Mvc;
using RoomReservation.Models;

namespace webapi.Repositories
{
    public interface IReservesController
    {
        Task<IActionResult> GetAllReserves();
        Task<IActionResult> GetReserveById(int id);
        Task<IActionResult> GetReservesByMeetingRoomId(int meetingRoomId);
        Task<IActionResult> AddReserve([FromBody] Reserve reserve);
        Task<IActionResult> UpdateReserve(int id, [FromBody] Reserve reserve);
        Task<IActionResult> DeleteReserve(int id);
    }
}
