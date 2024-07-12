using AutoMapper;
using BudgetTracker.DataAccess.Entites;

namespace BudgetTracker.Expenses.Profiles
{
    public class ExpenseProfiles : Profile
    {
        public ExpenseProfiles() 
        {
            CreateMap<Expense, Models.ExpenseForCreationDto>();
            CreateMap<Models.ExpenseForCreationDto, Expense>();
            CreateMap<Models.ExpenseForUpdateDto, Expense>();
        }
    }
}
