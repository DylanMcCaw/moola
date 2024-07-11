using BudgetTracker.Expenses.Entities;
using BudgetTracker.Incomes.Entities;
using BudgetTracker.Savings.Entities;
using Microsoft.EntityFrameworkCore;

namespace BudgetTracker.DbContexts
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
        public virtual DbSet<Income> Incomes { get; set; }

    }
}
