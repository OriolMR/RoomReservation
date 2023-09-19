using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using webapi.Areas.Identity.Data;
using RoomReservation.Models;
using webapi.Repositories;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Data;

namespace webapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase, IAuthenticationController
    {
        private readonly UserManager<webapiUser> userManager;
        private readonly SignInManager<webapiUser> signInManager;
        private readonly IConfiguration configuration;

        public AuthenticationController(UserManager<webapiUser> userManager, SignInManager<webapiUser> signInManager, IConfiguration configuration)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.configuration = configuration;
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
            await userManager.AddToRoleAsync(newUser, "Administrador");
       

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

            if (user == null)
            {
                return BadRequest(new { success = false, error = "usuario no encontrado" });
            }
            if (user != null)
            {
                var result = await signInManager.PasswordSignInAsync(user, loginData.PasswordHash, false, lockoutOnFailure: false);

                if (result == null)
                {
                    return BadRequest(new { success = false, error = "result es: " + result });
                }
                // Obtener los roles del usuario
                var roles = await userManager.GetRolesAsync(user);

                // Verificar si el usuario tiene algún rol específico que desees utilizar en el token
                // Por ejemplo, si el usuario tiene el rol "Administrador", utilizamos ese rol, de lo contrario, utilizamos "Usuario"
                var userRole = roles.Contains("ADMINISTRADOR") ? "administrador" : "Usuario";

                // Generar el token con el usuario y el rol
                var token = GenerateToken(user, userRole);

                if (token == null)
                {
                    // Si el token es nulo, indica un error en la generación del token
                    return BadRequest(new { success = false, error = "Error en la generación del token" });
                }

                // Devolver el token en la respuesta
                return Ok(new { success = true, token, userId = user.Id });
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

        private string GenerateToken(webapiUser user, string role)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(configuration.GetValue<string>("Jwt:SecretKey")); // Get the secret key from the application configuration
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(ClaimTypes.Role, role) // Aquí se agrega el claim del rol del usuario
        }),
                Expires = DateTime.UtcNow.AddHours(1),

           
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

    }
}
