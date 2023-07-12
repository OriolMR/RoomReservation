using Microsoft.AspNetCore.Mvc;
using RoomReservation.Models;

namespace webapi.Repositories
{
    public interface IOfficesController
    {
        Task<IActionResult> GetAllOffices();
        Task<IActionResult> GetOfficeById(int id);
        Task<IActionResult> GetOfficesByCityId(int cityId);
        Task<IActionResult> AddOffice([FromBody] Office office);
        Task<IActionResult> UpdateOffice(int id, [FromBody] Office office);
        Task<IActionResult> DeleteOffice(int id);
    }
}
