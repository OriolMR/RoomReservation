using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.Areas.Identity.Data;
using webapi.DataAccess;
using RoomReservation.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace webapi.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    [Authorize]

    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<webapiUser> userManager;
        private readonly SignInManager<webapiUser> signInManager;


        public AuthenticationController(UserManager<webapiUser> userManager, SignInManager<webapiUser> signInManager, ILogger<AuthenticationController> logger)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginViewModel loginData)
        {
         
            var user = await userManager.FindByNameAsync(loginData.userName);
            
            if (user != null)
            {
                
                var result = await signInManager.PasswordSignInAsync(user, loginData.passwordHash, false, false);
                if (result.Succeeded)
                {
                    // Autenticación exitosa
                    return Ok(new { success = true });
                }
            }

            // Autenticación fallida
            return BadRequest(new { success = false, error = "Nombre de usuario o contraseña incorrectos" });
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await signInManager.SignOutAsync();
            return Ok();
        }

        [HttpGet("user")]
        public async Task<IActionResult> GetUser()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = userManager.FindByIdAsync(userId).Result;

            if (user != null)
            {
                // Obtener los datos del usuario
                var userData = new
                {
                    userName = user.UserName,
                    email = user.Email
                };

                return Ok(userData);
            }
            else
            {
                // Usuario no encontrado
                return NotFound();
            }
        }
    }
}

