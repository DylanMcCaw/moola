using System;
using Microsoft.EntityFrameworkCore;
using BudgetTracker.Expenses.Models;
using BudgetTracker.Incomes.Models;
using BudgetTracker.Savings.Entities;

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