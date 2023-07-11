using Microsoft.AspNetCore.Mvc;
using webapi.Areas.Identity.Data;

namespace webapi.Repositories
{
    public interface IUsersController
    {
        Task<IActionResult> GetAllUsers();
        Task<IActionResult> GetUserById(string id);
        Task<IActionResult> GetUserByUsername(string username);
        Task<IActionResult> UpdateUser(string id, [FromBody] webapiUser user);
        Task<IActionResult> DeleteUser(string id);
    }
}
