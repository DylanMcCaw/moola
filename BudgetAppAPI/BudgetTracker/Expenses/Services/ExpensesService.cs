using BudgetTracker.Common.Services;
using BudgetTracker.Expenses.Models;
using Microsoft.EntityFrameworkCore;

namespace BudgetTracker.Expenses.Services
{
    public class ExpensesService : IExpensesService
    {
        private readonly ILogger<ExpensesService> _logger;
        private readonly IBudgetTrackerDbContext _context;

        public ExpensesService(ILogger<ExpensesService> logger, IBudgetTrackerDbContext context)
        {
            _logger = logger;
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<Expense> GetExpenseAsync(int id)
        {
            _logger.LogInformation("GET: GetExpenseById called");

            try
            {
                return await _context.Expenses.FindAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving Expense from the database.");
                // Handle or log the exception accordingly
                throw;
            }
        }

        public async Task<List<Expense>> GetUsersExpensesAsync(int userId)
        {
            _logger.LogInformation("GET: GetUsersExpenses called");

            try
            {
                return await _context.Expenses
                    .Where(sp => sp.UserID == userId)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving Expense from the database.");
                // Handle or log the exception accordingly
                throw;
            }

        }
        public async Task<bool> DeleteExpenseAsync(int id)
        {
            _logger.LogInformation("DELETE: DeleteExpense called");

            var Expense = await _context.Expenses.FindAsync(id);

            if (Expense == null)
            {
                _logger.LogWarning($"Expenses pot with ID {id} not found.");
                return false;
            }

            _context.Expenses.Remove(Expense);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<Expense> CreateExpenseAsync(Expense Expense)
        {
            if (Expense == null)
            {
                _logger.LogError("Expense object is null.");
                throw new ArgumentNullException(nameof(Expense));
            }

            _context.Expenses.Add(Expense);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                _logger.LogError(ex, "Error occurred while saving Expense to database.");
                // Handle or log the exception accordingly
                throw;
            }

            return Expense;
        }
    }
}
