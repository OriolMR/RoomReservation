using Microsoft.AspNetCore.Mvc;
using LocationService.Models;
using LocationService.DataAccess;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class CountriesController : ControllerBase
{
    private readonly LocationDbContext locationDbContext; 

    public CountriesController(LocationDbContext locationDbContext) 
    {
        this.locationDbContext = locationDbContext; 
    }

    // GET: api/Country
    [HttpGet]
    public async Task<IActionResult> GetAllCountries()
    {
        var countries = await locationDbContext
                            .Countries
                            .ToListAsync();

        return Ok(countries);
    }

    // GET: api/Country/{id}
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetCountryById([FromRoute] int id)
    {
        var country = await locationDbContext
                      .Countries
                      .FirstOrDefaultAsync(x => x.countryId == id);

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
        country.countryId = 0;

        await locationDbContext
            .Countries
            .AddAsync(country);

        await locationDbContext.SaveChangesAsync();

        return CreatedAtAction(nameof(GetCountryById), new { id = country.countryId }, country);
    }

    // PUT: api/Country/{id}
    [HttpPut("{id:guid}")]
    [Authorize(Roles = "Administrador")]
    public async Task<IActionResult> UpdateCountry(int id, [FromBody] Country country)
    {
        var existingCountry = await locationDbContext
                                  .Countries
                                  .FirstOrDefaultAsync(x => x.countryId == id);

        if (existingCountry != null)
        {
            existingCountry.countryName = country.countryName;

            await locationDbContext
                .SaveChangesAsync();

            return Ok(existingCountry);
        }

        return NotFound();
    }

    // DELETE: api/Country/{id}
    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Administrador")]
    public async Task<IActionResult> DeleteCountry(int id)
    {
        var country = await locationDbContext
                          .Countries
                          .FindAsync(id);

        if (country != null)
        {
            locationDbContext
                .Countries
                .Remove(country);

            await locationDbContext.SaveChangesAsync();

            return NoContent();
        }

        return NotFound();
    }
}

  


