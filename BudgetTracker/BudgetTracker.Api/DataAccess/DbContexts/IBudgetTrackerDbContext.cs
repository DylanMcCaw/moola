using System;
using Microsoft.EntityFrameworkCore;
using BudgetTracker.DataAccess.Entites;

namespace BudgetTracker.DataAccess.DbContexts
{
    public interface IBudgetTrackerDbContext : IDisposable
    {
        DbSet<SavingsPot> SavingsPots { get; set; }
        DbSet<Expense> Expenses { get; set; }
        DbSet<Income> Incomes { get; set; }


        int SaveChanges();
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}