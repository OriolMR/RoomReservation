using RoomReservation.Models;
using Microsoft.EntityFrameworkCore;

namespace webapi.DataAccess
{
    public class RoomReservationDbContext : DbContext
    {

        public RoomReservationDbContext(DbContextOptions<RoomReservationDbContext> options) : base(options)
        {
        }
        public DbSet<MeetingRoom> MeetingRooms { get; set; }

        public async Task<int> SaveChangesAsync()
        {
            return await base.SaveChangesAsync();
        }
    }
}
