using System;
using Microsoft.EntityFrameworkCore;
using BudgetTracker.Savings.Models;
using BudgetTracker.Expenses.Models;
using BudgetTracker.Incomes.Models;

namespace BudgetTracker.Common.Services
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