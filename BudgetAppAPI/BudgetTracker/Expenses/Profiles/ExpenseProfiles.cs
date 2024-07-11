using AutoMapper;

namespace BudgetTracker.Expenses.Profiles
{
    public class ExpenseProfiles : Profile
    {
        public ExpenseProfiles() 
        {
            CreateMap<Entities.Expense, Models.ExpenseForCreationDto>();
            CreateMap<Models.ExpenseForCreationDto, Entities.Expense>();
            CreateMap<Models.ExpenseForUpdateDto, Entities.Expense>();
        }
    }
}
