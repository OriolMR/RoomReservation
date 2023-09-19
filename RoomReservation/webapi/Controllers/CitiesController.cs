using RoomReservation.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.DataAccess;
using webapi.Repositories;
using Microsoft.AspNetCore.Authorization;
using System.Data;

namespace RoomReservation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CitiesController : ControllerBase, ICitiesController
    {
        private readonly RoomReservationDbContext roomReservationDbContext;

        public CitiesController(RoomReservationDbContext roomReservationDbContext)
        {
            this.roomReservationDbContext = roomReservationDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCities()
        {
            var cities = await roomReservationDbContext
                .Cities
                .ToListAsync();

            return Ok(cities);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetCityById([FromRoute] int id)
        {
            var city = await roomReservationDbContext.Cities
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
            var cities = await roomReservationDbContext
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
            await roomReservationDbContext
                 .Cities
                 .AddAsync(city);
            await roomReservationDbContext
                 .SaveChangesAsync();

            return CreatedAtAction(nameof(GetCityById), new { id = city.cityId }, city);
        }

        [HttpPut("{id:int}")]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> UpdateCity(int id, [FromBody] City city)
        {
            var existingCity = await roomReservationDbContext
                .Cities
                .FirstOrDefaultAsync(x => x.cityId == id);

            if (existingCity != null)
            {
                existingCity.cityName = city.cityName;
                existingCity.countryId = city.countryId;
                await roomReservationDbContext.SaveChangesAsync();

                return Ok(existingCity);
            }

            return NotFound();
        }

        [HttpDelete("{id:int}")]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> DeleteCity(int id)
        {
            var city = await roomReservationDbContext.Cities.FindAsync(id);

            if (city != null)
            {
                roomReservationDbContext
                    .Cities
                    .Remove(city);
                await roomReservationDbContext
                    .SaveChangesAsync();

                return NoContent();
            }

            return NotFound();
        }
    }
}




