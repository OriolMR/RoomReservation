﻿using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using webapi.Areas.Identity.Data;

namespace webapi.DataAccess
{
    public class IdentityAppDbContext : IdentityDbContext<webapiUser>, IIdentityAppDbContext
    {
        public IdentityAppDbContext(DbContextOptions<IdentityAppDbContext> options)
            : base(options)
        {
        }
    }
}
