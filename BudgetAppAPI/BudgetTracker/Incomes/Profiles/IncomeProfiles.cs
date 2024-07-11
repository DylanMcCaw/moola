using AutoMapper;

namespace BudgetTracker.Incomes.Profiles
{
    public class IncomeProfiles : Profile
    {
        public IncomeProfiles() 
        {
            CreateMap<Entities.Income, Models.IncomeForCreationDto>();
            CreateMap<Models.IncomeForCreationDto, Entities.Income>();
            CreateMap<Models.IncomeForUpdateDto, Entities.Income>();
        }
    }
}
