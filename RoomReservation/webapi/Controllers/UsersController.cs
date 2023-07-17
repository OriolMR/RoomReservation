using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.Areas.Identity.Data;
using webapi.DataAccess;
using webapi.Models;
using webapi.Repositories;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace RoomReservation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

   
    public class UsersController : ControllerBase, IUsersController
    {
        private readonly IdentityAppDbContext identityAppDbContext;
        private readonly UserManager<webapiUser> userManager;

        public UsersController(IdentityAppDbContext dbContext, UserManager<webapiUser> userManager)
        {
            identityAppDbContext = dbContext;
            this.userManager = userManager;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await identityAppDbContext.Users.ToListAsync();

            return Ok(users);
        }

        // GET: api/Users/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(string id)
        {
            var user = await identityAppDbContext.Users.FirstOrDefaultAsync(x => x.Id == id);

            if (user != null)
            {
                return Ok(user);
            }

            return NotFound();
        }

        // GET: api/Users/{username}
        [HttpGet("username/{username}")]
        public async Task<IActionResult> GetUserByUsername(string username)
        {
            var user = await identityAppDbContext.Users.FirstOrDefaultAsync(x => x.UserName == username);

            if (user != null)
            {
                return Ok(user);
            }

            return NotFound();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(string id, [FromBody] UpdateUserModel userModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingUser = await userManager.FindByIdAsync(id);

            if (existingUser != null)
            {
                // Actualizar solo las propiedades proporcionadas en el modelo
                existingUser.UserName = userModel.newUserName ?? existingUser.UserName;
                existingUser.Email = userModel.newEmail ?? existingUser.Email;

                // No es necesario encriptar la contraseña nuevamente
                // UserManager se encarga de esto automáticamente al guardar los cambios

                var result = await userManager.UpdateAsync(existingUser);

                if (result.Succeeded)
                {
                    return Ok(existingUser);
                }
                else
                {
                    // Hubo un error al actualizar el usuario
                    return BadRequest(result.Errors);
                }
            }

            return NotFound();
        }


        // DELETE: api/Users/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await identityAppDbContext.Users.FindAsync(id);

            if (user != null)
            {
                identityAppDbContext.Users.Remove(user);
                await identityAppDbContext.SaveChangesAsync();

                return NoContent();
            }

            return NotFound();
        }
    }
}
