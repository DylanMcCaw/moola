using AutoMapper;
using BudgetTracker.DataAccess.Entites;

namespace BudgetTracker.Incomes.Profiles
{
    public class IncomeProfiles : Profile
    {
        public IncomeProfiles() 
        {
            CreateMap<Income, Models.IncomeForCreationDto>();
            CreateMap<Models.IncomeForCreationDto, Income>();
            CreateMap<Models.IncomeForUpdateDto, Income>();
        }
    }
}
