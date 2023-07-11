using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using webapi.Areas.Identity.Data;
using RoomReservation.Models;
using webapi.Repositories;


namespace webapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase, IAuthenticationController
    {
        private readonly UserManager<webapiUser> userManager;
        private readonly SignInManager<webapiUser> signInManager;

        public AuthenticationController(UserManager<webapiUser> userManager, SignInManager<webapiUser> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel registerData)
        {
            if (!registerData.ValidateUserInput())
            {
                // Los campos requeridos no están completos
                return BadRequest(new { success = false, error = "Campos requeridos incompletos" });
            }

            var newUser = new webapiUser
            {
                UserName = registerData.UserName,
                Email = registerData.Email
            };

            var result = await userManager.CreateAsync(newUser, registerData.PasswordHash);

            if (result.Succeeded)
            {
                // Registro exitoso
                return Ok(new { success = true });
            }

            // Error al registrar el usuario
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error.Description);
            }

            return BadRequest(ModelState);
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

