using RoomReservation.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.DataAccess;

namespace RoomReservation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CitiesController : ControllerBase
    {
        private readonly RoomReservationDbContext roomReservationDbContext;

        public CitiesController(RoomReservationDbContext authApplicationDbContext)
        {
            this.roomReservationDbContext = authApplicationDbContext;
        }

        // GET: api/Cities
        [HttpGet]
        public async Task<IActionResult> GetAllCities()
        {
            var cities = await roomReservationDbContext.Cities.ToListAsync();

            return Ok(cities);
        }

        // GET: api/Cities/{id}
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetCityById([FromRoute] int id)
        {
            var city = await roomReservationDbContext.Cities.FirstOrDefaultAsync(x => x.cityId == id);

            if (city != null)
            {
                return Ok(city);
            }

            return NotFound();
        }

        // GET: api/Cities/{countryId}
        [HttpGet("getCitiesByCountryId/{countryId:int}")]
        public async Task<IActionResult> GetCitiesByCountryId(int countryId)
        {
            var cities = await roomReservationDbContext.Cities.Where(x => x.countryId == countryId).ToListAsync();

            if (cities != null && cities.Count > 0)
            {
                return Ok(cities);
            }

            return NotFound();
        }

        // POST: api/Cities
        [HttpPost]
        public async Task<IActionResult> AddCity([FromBody] City city)
        {
            city.cityId = 0; // Asignar valor inicial a CityId
            await roomReservationDbContext.Cities.AddAsync(city);
            await roomReservationDbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCityById), new { id = city.cityId }, city);
        }

        // PUT: api/Cities/{id}
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateCity(int id, [FromBody] City city)
        {
            var existingCity = await roomReservationDbContext.Cities.FirstOrDefaultAsync(x => x.cityId == id);

            if (existingCity != null)
            {
                existingCity.cityName = city.cityName;
                existingCity.countryId = city.countryId;
                await roomReservationDbContext.SaveChangesAsync();

                return Ok(existingCity);
            }

            return NotFound();
        }

        // DELETE: api/Cities/{id}
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteCity(int id)
        {
            var city = await roomReservationDbContext.Cities.FindAsync(id);

            if (city != null)
            {
                roomReservationDbContext.Cities.Remove(city);
                await roomReservationDbContext.SaveChangesAsync();

                return NoContent();
            }

            return NotFound();
        }
    }
}


