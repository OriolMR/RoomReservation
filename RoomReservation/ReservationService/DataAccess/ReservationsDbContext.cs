using RoomReservation.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace webapi.DataAccess
{
    public class ReservationsDbContext : DbContext
    {

        public ReservationsDbContext(DbContextOptions<ReservationsDbContext> options) : base(options)
        {
        }
        public DbSet<Reserve> Reserves { get; set; }
        public DbSet<MeetingRoom> MeetingRooms { get; set; }

        public async Task<int> SaveChangesAsync()
        {
            return await base.SaveChangesAsync();
        }
    }
}
