using System;
using Microsoft.EntityFrameworkCore;
using BudgetTracker.Savings.Models;
using BudgetTracker.Expenses.Models;

namespace BudgetTracker.Common.Services
{
    public interface IBudgetTrackerDbContext : IDisposable
    {
        DbSet<SavingsPot> SavingsPots { get; set; }
        DbSet<Expense> Expenses { get; set; }

        int SaveChanges();
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}