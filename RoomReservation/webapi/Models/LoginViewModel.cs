using Microsoft.AspNetCore.Authentication;
using webapi.DataAccess;

namespace RoomReservation.Models
{
    public class LoginViewModel
    {
        public string userName { get; set; }
        public string passwordHash { get; set; }

        public bool ValidateUserInput()
        {
            //check if all fields are filled
            if (string.IsNullOrEmpty(userName) || string.IsNullOrEmpty(passwordHash))
                return false;

            //do any other necessary validation checks

            return true;
        }

       
    }
}
