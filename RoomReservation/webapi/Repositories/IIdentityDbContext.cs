using Microsoft.EntityFrameworkCore;
using webapi.Areas.Identity.Data;

namespace webapi.DataAccess
{
    public interface IIdentityAppDbContext
    {
        DbSet<webapiUser> Users { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}

