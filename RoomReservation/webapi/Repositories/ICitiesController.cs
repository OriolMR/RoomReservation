using Microsoft.AspNetCore.Mvc;
using RoomReservation.Models;

namespace webapi.Repositories
{
    public interface ICitiesController
    {
        Task<IActionResult> GetAllCities();
        Task<IActionResult> GetCityById(int id);
        Task<IActionResult> GetCitiesByCountryId(int countryId);
        Task<IActionResult> AddCity([FromBody] City city);
        Task<IActionResult> UpdateCity(int id, [FromBody] City city);
        Task<IActionResult> DeleteCity(int id);
    }
}