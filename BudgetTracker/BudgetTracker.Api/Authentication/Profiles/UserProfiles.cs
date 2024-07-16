using AutoMapper;
using BudgetTracker.DataAccess.Entites;

namespace BudgetTracker.Authentication.Profiles
{
    public class UserProfiles : Profile
    {
      public UserProfiles() 
        {
            CreateMap<User, Models.LoginDto>();
            CreateMap<Models.LoginDto, User>();
            CreateMap<Models.RegisterDto, User>();
        }
    }
}
