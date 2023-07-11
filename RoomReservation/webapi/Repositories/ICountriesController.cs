using Microsoft.AspNetCore.Mvc;
using RoomReservation.Models;

namespace webapi.Repositories
{
    public interface ICountriesController
    {
        Task<IActionResult> GetAllCountries();
        Task<IActionResult> GetCountryById(int id);
        Task<IActionResult> AddCountry([FromBody] Country country);
        Task<IActionResult> UpdateCountry(int id, [FromBody] Country country);
        Task<IActionResult> DeleteCountry(int id);
    }
}
