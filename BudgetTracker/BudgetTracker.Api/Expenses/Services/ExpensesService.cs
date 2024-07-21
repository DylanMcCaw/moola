using BudgetTracker.DataAccess.DbContexts;
using BudgetTracker.DataAccess.Entites;
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

        public async Task<Expense> CreateExpenseAsync(Expense expense)
        {
            if (expense == null)
            {
                _logger.LogError("Expense object is null.");
                throw new ArgumentNullException(nameof(Expense));
            }

            _context.Expenses.Add(expense);

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

            return expense;
        }

        public async Task<Expense> UpdateExpenseAsync(int id, Expense updatedExpense)
        {
            _logger.LogInformation($"PUT: UpdateExpense called for Expense ID {id}");

            var existingExpense = await _context.Expenses.FindAsync(id);

            if (existingExpense == null)
            {
                _logger.LogWarning($"Expense with ID {id} not found.");
                throw new ArgumentNullException(nameof(Expense));
            }

            // Update the existing expense with the values from updatedExpense
            existingExpense.UserID = updatedExpense.UserID;
            existingExpense.Description = updatedExpense.Description;
            existingExpense.Amount = updatedExpense.Amount;
            existingExpense.Frequency = updatedExpense.Frequency;
            existingExpense.Category = updatedExpense.Category;
            existingExpense.StartDate = updatedExpense.StartDate;
            existingExpense.Icon = updatedExpense.Icon;
            existingExpense.IconColour = updatedExpense.IconColour;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                _logger.LogError(ex, $"Error occurred while updating Expense with ID {id}.");
                // Handle or log the exception accordingly
                throw;
            }

            return existingExpense;
        }
    }
}
