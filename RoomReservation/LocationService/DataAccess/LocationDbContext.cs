using LocationService.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace LocationService.DataAccess
{
    public class LocationDbContext : DbContext
    {
        public LocationDbContext(DbContextOptions<LocationDbContext> options) : base(options)
        {
        }

        public DbSet<Country> Countries { get; set; }


        // Otras DbSet para entidades relacionadas

        public async Task<int> SaveChangesAsync()
        {
            return await base.SaveChangesAsync();
        }
    }
}

