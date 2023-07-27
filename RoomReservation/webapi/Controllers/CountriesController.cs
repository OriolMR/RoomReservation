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
    public class CountriesController : ControllerBase, ICountriesController 
    {
        private readonly RoomReservationDbContext roomReservationDbContext;

        public CountriesController(RoomReservationDbContext roomReservationDbContext)
        {
            this.roomReservationDbContext = roomReservationDbContext;
        }

        // GET: api/Country
        [HttpGet]
        public async Task<IActionResult> GetAllCountries()
        {
            var countries = await roomReservationDbContext.Countries.ToListAsync();

            return Ok(countries);
        }

        // GET: api/Country/{id}
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetCountryById([FromRoute] int id)
        {
            var country = await roomReservationDbContext.Countries.FirstOrDefaultAsync(x => x.countryId == id);

            if (country != null)
            {
                return Ok(country);
            }

            return NotFound();
        }

        // POST: api/Country
        [HttpPost]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> AddCountry([FromBody] Country country)
        {
            country.countryId = 0; // Asignar valor inicial a countryId
            await roomReservationDbContext.Countries.AddAsync(country);
            await roomReservationDbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCountryById), new { id = country.countryId }, country);
        }

        // PUT: api/Country/{id}
        [HttpPut("{id:guid}")]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> UpdateCountry(int id, [FromBody] Country country)
        {
            var existingCountry = await roomReservationDbContext.Countries.FirstOrDefaultAsync(x => x.countryId == id);

            if (existingCountry != null)
            {
                existingCountry.countryName = country.countryName;
                await roomReservationDbContext.SaveChangesAsync();

                return Ok(existingCountry);
            }

            return NotFound();
        }

        // DELETE: api/Country/{id}
        [HttpDelete("{id:int}")]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> DeleteCountry(int id)
        {
            var country = await roomReservationDbContext.Countries.FindAsync(id);

            if (country != null)
            {
                roomReservationDbContext.Countries.Remove(country);
                await roomReservationDbContext.SaveChangesAsync();

                return NoContent();
            }

            return NotFound();
        }
    }
}
