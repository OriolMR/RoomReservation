using Microsoft.AspNetCore.Mvc;
using RoomReservation.Models;
using System.Diagnostics;
using webapi.Models;

namespace webapi.Repositories
{
    public interface IReservesController
    {
        Task<IActionResult> GetAllReserves();
        Task<IActionResult> GetReserveById(int id);
        Task<IActionResult> GetReservesByMeetingRoomId(int meetingRoomId);
        Task<IActionResult> GetReservesByUserId(string userId);
        Task<IActionResult> AddReserve([FromBody] ReserveData reserveData);
        Task<IActionResult> UpdateReserve(int id, [FromBody] UpdateReserveModel updateModel);
        Task<IActionResult> DeleteReserve(int id);
    }
}
