using System;
using Microsoft.EntityFrameworkCore;
using BudgetTracker.Savings.Entities;
using BudgetTracker.Incomes.Entities;
using BudgetTracker.Expenses.Entities;

namespace BudgetTracker.DbContexts
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