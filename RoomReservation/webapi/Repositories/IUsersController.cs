using Microsoft.AspNetCore.Mvc;
using webapi.Areas.Identity.Data;
using webapi.Models;

namespace webapi.Repositories
{
    public interface IUsersController
    {
        Task<IActionResult> GetAllUsers();
        Task<IActionResult> GetUserById(string id);
        Task<IActionResult> GetUserByUsername(string username);
        Task<IActionResult> UpdateUser(string id, [FromBody] UpdateUserModel user);
        //Task<IActionResult> UpdateUserAdmin(string id, [FromBody] UpdateUsersAdminModel user);
        Task<IActionResult> DeleteUser(string id);
    }
}
