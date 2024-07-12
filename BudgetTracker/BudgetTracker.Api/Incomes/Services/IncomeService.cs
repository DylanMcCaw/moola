using BudgetTracker.DataAccess.DbContexts;
using BudgetTracker.DataAccess.Entites;
using Microsoft.EntityFrameworkCore;

namespace BudgetTracker.Incomes.Services
{
    public class IncomeService : IIncomeService
    {
        private readonly ILogger<IncomeService> _logger;
        private readonly IBudgetTrackerDbContext _context;

        public IncomeService(ILogger<IncomeService> logger, IBudgetTrackerDbContext context)
        {
            _logger = logger;
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<Income> GetIncomeAsync(int id)
        {
            _logger.LogInformation("GET: GetIncomeById called");

            try
            {
                return await _context.Incomes.FindAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving Income from the database.");
                // Handle or log the exception accordingly
                throw;
            }
        }

        public async Task<List<Income>> GetUsersIncomeAsync(int userId)
        {
            _logger.LogInformation("GET: GetUsersIncome called");

            try
            {
                return await _context.Incomes
                    .Where(sp => sp.UserID == userId)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving Income from the database.");
                // Handle or log the exception accordingly
                throw;
            }

        }
        public async Task<bool> DeleteIncomeAsync(int id)
        {
            _logger.LogInformation("DELETE: DeleteIncome called");

            var Income = await _context.Incomes.FindAsync(id);

            if (Income == null)
            {
                _logger.LogWarning($"Income pot with ID {id} not found.");
                return false;
            }

            _context.Incomes.Remove(Income);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<Income> CreateIncomeAsync(Income Income)
        {
            if (Income == null)
            {
                _logger.LogError("Income object is null.");
                throw new ArgumentNullException(nameof(Income));
            }

            _context.Incomes.Add(Income);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                _logger.LogError(ex, "Error occurred while saving Income to database.");
                // Handle or log the exception accordingly
                throw;
            }

            return Income;
        }

        public async Task<bool> UpdateIncomeAsync(int id, Income updatedIncome)
        {
            _logger.LogInformation($"PUT: UpdateIncome called for Income ID {id}");

            var existingIncome = await _context.Incomes.FindAsync(id);

            if (existingIncome == null)
            {
                _logger.LogWarning($"Income with ID {id} not found.");
                return false;
            }

            // Update the existing Income with the values from updatedIncome
            existingIncome.Description = updatedIncome.Description;
            existingIncome.Category = updatedIncome.Category;
            existingIncome.StartDate = updatedIncome.StartDate;
            existingIncome.Icon = updatedIncome.Icon;
            existingIncome.IconColour = updatedIncome.IconColour;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                _logger.LogError(ex, $"Error occurred while updating Income with ID {id}.");
                // Handle or log the exception accordingly
                throw;
            }

            return true;
        }
    }
}
