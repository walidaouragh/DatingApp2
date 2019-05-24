using System.Threading.Tasks;
using DatingApp2.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using DatingApp2.API.Dtos;
using Microsoft.AspNetCore.Identity;
using DatingApp2.API.Models;

namespace DatingApp2.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly UserManager<User> _userManager;

        public AdminController(DataContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("userswithRoles")]
        public async Task<IActionResult> GetUsersWithRoles()
        {
            var userList = await (from user in _context.Users orderby user.UserName 
                                    select new 
                                    {
                                        Id = user.Id,
                                        UserName = user.UserName,
                                        Roles = (from userRole in user.UserRoles
                                                    join role in _context.Roles
                                                    on userRole.RoleId
                                                    equals role.Id
                                                    select role.Name).ToList()
                                    }).ToListAsync();

            return Ok(userList);
        }
        
        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("editRoles/{userName}")]

        public async Task<IActionResult> EditRoles(string userName, RoleEditDto roleEditDto)
        {
            var user = await _userManager.FindByNameAsync(userName);

            var userRoles = await _userManager.GetRolesAsync(user);

            var selectedRoles = roleEditDto.RoleNames;

            // ?? same as  ==> selectedRoles = selectedRoles != null ? selectedRoles : new string[] {}; (c# syntax)
            selectedRoles = selectedRoles ?? new string[] {};

            var result = await _userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));

            if (!result.Succeeded)
                return BadRequest("Failed to add to roles");

             result = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles)); 

             if (!result.Succeeded)
                return BadRequest("Failed to remove the roles");

             return Ok(await _userManager.GetRolesAsync(user));   
        }

        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpGet("PhotosForModeration")]
        public IActionResult GetPhotosForModeration()
        {
            return Ok("Admins or moderators can see this");
        }
    }
}