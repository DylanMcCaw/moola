using AutoMapper;
using BudgetTracker.DataAccess.Entites;

namespace BudgetTracker.Savings.Profiles
{
    public class SavingsProfile : Profile
    {
        public SavingsProfile() 
        {
            CreateMap<SavingsPot, Models.SavingsPotDto>();
            CreateMap<Models.SavingsPotForCreationDto, SavingsPot>();
            CreateMap<Models.SavingsPotForUpdate, SavingsPot>();
        }
    }
}
