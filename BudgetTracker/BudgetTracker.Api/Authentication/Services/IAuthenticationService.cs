using BudgetTracker.Authentication.Models;

namespace BudgetTracker.Authentication.Services
{
    public interface IAuthenticationService
    {
        Task<bool> RegisterUserAsync(RegisterDto registerDto);
        Task<string> AuthenticateUserAsync(LoginDto loginDto);
        Task<bool> LogoutUserAsync();
    }
}
