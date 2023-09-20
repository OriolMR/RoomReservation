using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.Areas.Identity.Data;
using webapi.DataAccess;
using webapi.Models;
using webapi.Repositories;


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
            var users = await identityAppDbContext
                           .Users
                           .ToListAsync();

            return Ok(users);
        }

        // GET: api/Users/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(string id)
        {
            var user = await identityAppDbContext
                           .Users
                           .FirstOrDefaultAsync(x => x.Id == id);

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
            var user = await identityAppDbContext
                           .Users
                           .FirstOrDefaultAsync(x => x.UserName == username);

            if (user != null)
            {
                return Ok(user);
            }

            return NotFound();
        }

        // GET: api/Users/{useremail}
        [HttpGet("useremail/{useremail}")]
        public async Task<IActionResult> GetUserByUseremail(string useremail)
        {
            var user = await identityAppDbContext
                           .Users
                           .FirstOrDefaultAsync(x => x.Email == useremail);

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

                if (!string.IsNullOrEmpty(userModel.currentPasswordHash) 
                        && !string.IsNullOrEmpty(userModel.newPasswordHash))
                {
                    // Cambiar la contraseña solo si se proporciona la contraseña actual y la nueva contraseña
                    var changePasswordResult = await userManager
                                                   .ChangePasswordAsync(existingUser, userModel.currentPasswordHash,
                                                                            userModel.newPasswordHash);

                    if (!changePasswordResult.Succeeded)
                    {
                        // Hubo un error al cambiar la contraseña
                        return BadRequest(changePasswordResult.Errors);
                    }
                }

                var updateResult = await userManager.UpdateAsync(existingUser);

                if (updateResult.Succeeded)
                {
                    return Ok(existingUser);
                }
                else
                {
                    // Hubo un error al actualizar el usuario
                    return BadRequest(updateResult.Errors);
                }
            }

            return NotFound();
        }

        // DELETE: api/Users/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await identityAppDbContext
                           .Users
                           .FindAsync(id);

            if (user != null)
            {
                identityAppDbContext
                    .Users
                    .Remove(user);

                await identityAppDbContext.SaveChangesAsync();

                return NoContent();
            }

            return NotFound();
        }
    }
}

