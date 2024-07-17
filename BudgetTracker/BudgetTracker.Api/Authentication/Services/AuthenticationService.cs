using AutoMapper;
using BudgetTracker.Authentication.Models;
using BudgetTracker.DataAccess.DbContexts;
using BudgetTracker.DataAccess.Entites;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BudgetTracker.Authentication.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly BudgetTrackerDbContext _context;
        private readonly IMapper _mapper;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AuthenticationService(
            BudgetTrackerDbContext context,
            IMapper mapper,
            IPasswordHasher<User> passwordHasher,
            IConfiguration configuration,
            IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _mapper = mapper;
            _passwordHasher = passwordHasher;
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<bool> RegisterUserAsync(RegisterDto registerDto)
        {
            if (await _context.Users.AnyAsync(u => u.Email == registerDto.Email))
            {
                return false;
            }

            var userEntity = _mapper.Map<User>(registerDto);
            userEntity.PasswordHash = _passwordHasher.HashPassword(userEntity, registerDto.Password);
            _context.Users.Add(userEntity);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<string> AuthenticateUserAsync(LoginDto loginDto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == loginDto.Email);
            if (user == null || _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, loginDto.Password) != PasswordVerificationResult.Success)
            {
                return null;
            }

            var token = GenerateJwtToken(user);
            SetCurrentUser(user);
            return token;
        }

        public async Task<bool> LogoutUserAsync()
        {
            try
            {
                _httpContextAccessor.HttpContext.User = new ClaimsPrincipal(new ClaimsIdentity());
                return true;
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error during logout: {ex.Message}");
                return false;
            }
        }

        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Name),
                    new Claim(ClaimTypes.Email, user.Email)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private void SetCurrentUser(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Email, user.Email)
            };

            var identity = new ClaimsIdentity(claims, "BudgetTracker");
            _httpContextAccessor.HttpContext.User = new ClaimsPrincipal(identity);
        }

        public User GetCurrentUser()
        {
            var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return null;
            }

            return _context.Users.FirstOrDefault(u => u.Id == int.Parse(userId));
        }
    }
}