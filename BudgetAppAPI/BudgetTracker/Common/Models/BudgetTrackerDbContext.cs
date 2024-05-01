using BudgetTracker.Common.Services;
using BudgetTracker.Expenses.Models;
using BudgetTracker.Savings.Models;
using Microsoft.EntityFrameworkCore;

namespace BudgetTracker.Common.Models
{
        public partial class BudgetTrackerDbContext : DbContext, IBudgetTrackerDbContext
        {
            public BudgetTrackerDbContext(DbContextOptions
            <BudgetTrackerDbContext> options)
                : base(options)
            {
            }
            public virtual DbSet<SavingsPot> SavingsPots { get; set; }
            public virtual DbSet<Expense> Expenses { get; set; }
    }
}
