using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.Areas.Identity.Data;
using webapi.DataAccess;
using RoomReservation.Models;
using Microsoft.AspNetCore.Authorization;
using System.Diagnostics;
using System.Security.Claims;
using webapi.Areas.Identity.Pages.Account;

namespace webapi.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
   


    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<webapiUser> userManager;
        private readonly SignInManager<webapiUser> signInManager;


        public AuthenticationController(UserManager<webapiUser> userManager, SignInManager<webapiUser> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginViewModel loginData)
        {
            if (!loginData.ValidateUserInput())
            {
                // Los campos requeridos no están completos
                return BadRequest(new { success = false, error = "Campos requeridos incompletos" });
            }

            var user = await userManager.FindByNameAsync(loginData.UserName);

            if (user != null)
            {
                var result = await signInManager.PasswordSignInAsync(user, loginData.PasswordHash, false, lockoutOnFailure: false);

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
    }
}

