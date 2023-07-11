using Microsoft.AspNetCore.Authentication;
using webapi.DataAccess;

namespace RoomReservation.Models
{
    public class LoginViewModel
    {
        public string UserName { get; set; }
        public string PasswordHash { get; set; }

        public bool ValidateUserInput()
        {
            // Verificar que todos los campos estén completos
            if (string.IsNullOrEmpty(UserName) || string.IsNullOrEmpty(PasswordHash))
                return false;

            // Realizar cualquier otra validación necesaria

            return true;
        }
    }
}
