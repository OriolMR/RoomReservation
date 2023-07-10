using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace webapi.Areas.Identity.Data
{
    // Add profile data for application users by adding properties to the webapiUser class
    public class webapiUser : IdentityUser
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }

        public webapiUser() { }

        public webapiUser(string userName, string email, string passwordHash)
        {
            UserName = userName;
            Email = email;
            PasswordHash = passwordHash;
        }
    }

}

