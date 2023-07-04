using Microsoft.EntityFrameworkCore;
using RoomReservation.Models;

public interface IRoomReservationDbContext
{
    DbSet<Country> Countries { get; set; }
    DbSet<City> Cities { get; set; }
    DbSet<Office> Offices { get; set; }
    DbSet<MeetingRoom> MeetingRooms { get; set; }
    DbSet<Reserve> Reserves { get; set; }

    Task<int> SaveChangesAsync();
}
