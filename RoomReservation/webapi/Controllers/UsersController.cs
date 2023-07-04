using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.Areas.Identity.Data;
using webapi.DataAccess;

namespace RoomReservation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IIdentityAppDbContext identityAppDbContext;

        public UsersController(IIdentityAppDbContext dbContext)
        {
            identityAppDbContext = dbContext;
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

        // POST: api/Users
        [HttpPost]
        public async Task<IActionResult> AddUser([FromBody] webapiUser user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newUser = new webapiUser
            {
                // Asignar las propiedades del nuevo usuario
                UserName = user.UserName,
                NormalizedUserName = user.NormalizedUserName,
                Email = user.Email,
                NormalizedEmail = user.NormalizedEmail,
                EmailConfirmed = user.EmailConfirmed,
                PasswordHash = user.PasswordHash,
                SecurityStamp = user.SecurityStamp,
                ConcurrencyStamp = user.ConcurrencyStamp,
                PhoneNumber = user.PhoneNumber,
                PhoneNumberConfirmed = user.PhoneNumberConfirmed,
                TwoFactorEnabled = user.TwoFactorEnabled,
                LockoutEnd = user.LockoutEnd,
                LockoutEnabled = user.LockoutEnabled,
                AccessFailedCount = user.AccessFailedCount
            };

            identityAppDbContext.Users.Add(newUser); // Agregar el nuevo usuario al contexto

            await identityAppDbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUserById), new { id = newUser.Id }, newUser);
        }

        // PUT: api/Users/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(string id, [FromBody] webapiUser user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingUser = await identityAppDbContext.Users.FirstOrDefaultAsync(x => x.Id == id);

            if (existingUser != null)
            {
                // Actualizar propiedades del usuario
                existingUser.UserName = user.UserName;
                existingUser.NormalizedUserName = user.NormalizedUserName;
                existingUser.Email = user.Email;
                existingUser.NormalizedEmail = user.NormalizedEmail;
                existingUser.EmailConfirmed = user.EmailConfirmed;
                existingUser.PasswordHash = user.PasswordHash;
                existingUser.SecurityStamp = user.SecurityStamp;
                existingUser.ConcurrencyStamp = user.ConcurrencyStamp;
                existingUser.PhoneNumber = user.PhoneNumber;
                existingUser.PhoneNumberConfirmed = user.PhoneNumberConfirmed;
                existingUser.TwoFactorEnabled = user.TwoFactorEnabled;
                existingUser.LockoutEnd = user.LockoutEnd;
                existingUser.LockoutEnabled = user.LockoutEnabled;
                existingUser.AccessFailedCount = user.AccessFailedCount;

                await identityAppDbContext.SaveChangesAsync();

                return Ok(existingUser);
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
