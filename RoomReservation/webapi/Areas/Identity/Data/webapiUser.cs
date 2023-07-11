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

        public webapiUser() { }

        public webapiUser(string userName, string email, string passwordHash)
        {
            UserName = userName;
            Email = email;
            PasswordHash = passwordHash;
        }
    }

}

