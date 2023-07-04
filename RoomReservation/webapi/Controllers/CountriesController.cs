using RoomReservation.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace RoomReservation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CountriesController : ControllerBase
    {
        private readonly IRoomReservationDbContext roomReservationRepository;

        public CountriesController(IRoomReservationDbContext roomReservationRepository)
        {
            this.roomReservationRepository = roomReservationRepository;
        }

        // GET: api/Country
        [HttpGet]
        public async Task<IActionResult> GetAllCountries()
        {
            var countries = await roomReservationRepository.Countries.ToListAsync();

            return Ok(countries);
        }

        // GET: api/Country/{id}
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetCountryById([FromRoute] int id)
        {
            var country = await roomReservationRepository.Countries.FirstOrDefaultAsync(x => x.countryId == id);

            if (country != null)
            {
                return Ok(country);
            }

            return NotFound();
        }

        // POST: api/Country
        [HttpPost]
        public async Task<IActionResult> AddCountry([FromBody] Country country)
        {
            country.countryId = 0; // Asignar valor inicial a countryId
            await roomReservationRepository.Countries.AddAsync(country);
            await roomReservationRepository.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCountryById), new { id = country.countryId }, country);
        }

        // PUT: api/Country/{id}
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> UpdateCountry(int id, [FromBody] Country country)
        {
            var existingCountry = await roomReservationRepository.Countries.FirstOrDefaultAsync(x => x.countryId == id);

            if (existingCountry != null)
            {
                existingCountry.countryName = country.countryName;
                await roomReservationRepository.SaveChangesAsync();

                return Ok(existingCountry);
            }

            return NotFound();
        }

        // DELETE: api/Country/{id}
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteCountry(int id)
        {
            var country = await roomReservationRepository.Countries.FindAsync(id);

            if (country != null)
            {
                roomReservationRepository.Countries.Remove(country);
                await roomReservationRepository.SaveChangesAsync();

                return NoContent();
            }

            return NotFound();
        }
    }
}
