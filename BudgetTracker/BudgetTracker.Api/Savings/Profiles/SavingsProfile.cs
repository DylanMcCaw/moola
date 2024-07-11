using AutoMapper;

namespace BudgetTracker.Savings.Profiles
{
    public class SavingsProfile : Profile
    {
        public SavingsProfile() 
        {
            CreateMap<Entities.SavingsPot, Models.SavingsPotDto>();
            CreateMap<Models.SavingsPotForCreationDto, Entities.SavingsPot>();
            CreateMap<Models.SavingsPotForUpdate, Entities.SavingsPot>();
        }
    }
}
