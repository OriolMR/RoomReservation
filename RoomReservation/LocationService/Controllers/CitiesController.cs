using LocationService.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LocationService.DataAccess;
using Microsoft.AspNetCore.Authorization;
using System.Data;

namespace RoomReservation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CitiesController : ControllerBase
    {
        private readonly LocationDbContext locationDbContext;

        public CitiesController(LocationDbContext locationDbContext)
        {
            this.locationDbContext = locationDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCities()
        {
            var cities = await locationDbContext
                .Cities
                .ToListAsync();

            return Ok(cities);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetCityById([FromRoute] int id)
        {
            var city = await locationDbContext.Cities
                .FirstOrDefaultAsync(x => x.cityId == id);

            if (city != null)
            {
                return Ok(city);
            }

            return NotFound();
        }

        [HttpGet("getCitiesByCountryId/{countryId:int}")]
        public async Task<IActionResult> GetCitiesByCountryId(int countryId)
        {
            var cities = await locationDbContext
                .Cities
                .Where(x => x.countryId == countryId)
                .ToListAsync();

            if (cities != null && cities.Count > 0)
            {
                return Ok(cities);
            }

            return NotFound();
        }

        [HttpPost]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> AddCity([FromBody] City city)
        {
            city.cityId = 0;
            await locationDbContext
                 .Cities
                 .AddAsync(city);
            await locationDbContext
                 .SaveChangesAsync();

            return CreatedAtAction(nameof(GetCityById), new { id = city.cityId }, city);
        }

        [HttpPut("{id:int}")]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> UpdateCity(int id, [FromBody] City city)
        {
            var existingCity = await locationDbContext
                .Cities
                .FirstOrDefaultAsync(x => x.cityId == id);

            if (existingCity != null)
            {
                existingCity.cityName = city.cityName;
                existingCity.countryId = city.countryId;
                await locationDbContext.SaveChangesAsync();

                return Ok(existingCity);
            }

            return NotFound();
        }

        [HttpDelete("{id:int}")]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> DeleteCity(int id)
        {
            var city = await locationDbContext.Cities.FindAsync(id);

            if (city != null)
            {
                locationDbContext
                    .Cities
                    .Remove(city);
                await locationDbContext
                    .SaveChangesAsync();

                return NoContent();
            }

            return NotFound();
        }
    }
}
