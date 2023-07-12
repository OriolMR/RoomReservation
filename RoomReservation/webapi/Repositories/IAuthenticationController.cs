using Microsoft.AspNetCore.Mvc;
using RoomReservation.Models;

namespace webapi.Repositories
{
    public interface IAuthenticationController
    {
        Task<IActionResult> Register([FromBody] RegisterViewModel registerData);
        Task<IActionResult> Login([FromBody] LoginViewModel loginData);
    }
}
