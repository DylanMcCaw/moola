using BudgetTracker.Authentication.Models;
using BudgetTracker.Authentication.Services;
using Microsoft.AspNetCore.Mvc;

namespace BudgetTracker.Authentication.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;

        public AuthenticationController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            var result = await _authenticationService.RegisterUserAsync(registerDto);

            if (!result)
            {
                return BadRequest("Email is already taken.");
            }

            return Ok();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var token = await _authenticationService.AuthenticateUserAsync(loginDto);

            if (token == null)
            {
                return Unauthorized();
            }

            return Ok(new { Token = token });
        }
    }
}
