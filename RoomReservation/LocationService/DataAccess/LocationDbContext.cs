using LocationService.Models;
using Microsoft.EntityFrameworkCore;
using RoomReservation.Models;
using System.Collections.Generic;

namespace LocationService.DataAccess
{
    public class LocationDbContext : DbContext
    {
        public LocationDbContext(DbContextOptions<LocationDbContext> options) : base(options)
        {
        }

        public DbSet<Country> Countries { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<Office> Offices { get; set; }


        // Otras DbSet para entidades relacionadas

        public async Task<int> SaveChangesAsync()
        {
            return await base.SaveChangesAsync();
        }
    }
}

