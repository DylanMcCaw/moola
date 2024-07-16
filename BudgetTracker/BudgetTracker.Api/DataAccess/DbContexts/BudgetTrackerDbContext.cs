using BudgetTracker.DataAccess.Entites;
using Microsoft.EntityFrameworkCore;

namespace BudgetTracker.DataAccess.DbContexts
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
        public virtual DbSet<User> Users { get; set; }
    }
}
