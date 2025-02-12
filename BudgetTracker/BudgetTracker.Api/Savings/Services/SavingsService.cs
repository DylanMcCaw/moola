﻿using BudgetTracker.DataAccess.DbContexts;
using BudgetTracker.DataAccess.Entites;
using Microsoft.EntityFrameworkCore;

namespace BudgetTracker.Savings.Services
{
    public class SavingsService : ISavingsService
    {
        private readonly ILogger<SavingsService> _logger;
        private readonly IBudgetTrackerDbContext _context;

        public SavingsService(ILogger<SavingsService> logger, IBudgetTrackerDbContext context)
        {
            _logger = logger;
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<SavingsPot> GetSavingsPotAsync(int id)
        {
            _logger.LogInformation("GET: GetSavingsPotById called");

            try
            {
                return await _context.SavingsPots.FindAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving SavingsPot from the database.");
                // Handle or log the exception accordingly
                throw;
            }
        }

        public async Task<List<SavingsPot>> GetUsersSavingsPotsAsync(int userId)
        {
            _logger.LogInformation("GET: GetUsersSavingsPots called");

            try
            {
                return await _context.SavingsPots
                    .Where(sp => sp.UserID == userId)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving SavingsPot from the database.");
                // Handle or log the exception accordingly
                throw;
            }

        }

        public async Task<bool> DeleteSavingsPotAsync(int id)
        {
            _logger.LogInformation($"DELETE: DeleteSavingsPot called for ID {id}");

            var savingsPot = await _context.SavingsPots.FindAsync(id);

            if (savingsPot == null)
            {
                _logger.LogWarning($"Savings pot with ID {id} not found.");
                return false;
            }

            try
            {
                // Delete all transactions associated with this savings pot
                await DeleteSavingsPotTransactionsAsync(id);

                // Now delete the savings pot itself
                _context.SavingsPots.Remove(savingsPot);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while deleting SavingsPot with ID {id}.");
                throw;
            }
        }

        public async Task<SavingsPot> CreateSavingsPotAsync(SavingsPot savingsPot)
        {
            if (savingsPot == null)
            {
                _logger.LogError("SavingsPot object is null.");
                throw new ArgumentNullException(nameof(savingsPot));
            }

            _context.SavingsPots.Add(savingsPot);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                _logger.LogError(ex, "Error occurred while saving SavingsPot to database.");
                // Handle or log the exception accordingly
                throw;
            }

            return savingsPot;
        }

        public async Task<SavingsPot> UpdateSavingsPotAsync(int id, SavingsPot updatedSavingsPot)
        {
            _logger.LogInformation($"PUT: UpdateSavingsPot called for SavingsPot ID {id}");

            var existingSavingsPot = await _context.SavingsPots.FindAsync(id);

            if (existingSavingsPot == null)
            {
                _logger.LogWarning($"SavingsPot with ID {id} not found.");
                throw new ArgumentNullException(nameof(existingSavingsPot));
            }

            // Update the existing savings pot with the values from updatedSavingsPot
            existingSavingsPot.Description = updatedSavingsPot.Description;
            existingSavingsPot.TargetAmount = updatedSavingsPot.TargetAmount;
            existingSavingsPot.Icon = updatedSavingsPot.Icon;
            existingSavingsPot.IconColour = updatedSavingsPot.IconColour;
            existingSavingsPot.GoalDate = updatedSavingsPot.GoalDate;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                _logger.LogError(ex, $"Error occurred while updating SavingsPot with ID {id}.");
                // Handle or log the exception accordingly
                throw;
            }

            return existingSavingsPot;
        }

        public async Task<SavingsPotTransaction> DepositAsync(int savingsPotId, double amount)
        {
            _logger.LogInformation($"POST: DepositAsync called for SavingsPot ID {savingsPotId}");

            var savingsPot = await _context.SavingsPots.FindAsync(savingsPotId);
            if (savingsPot == null)
            {
                _logger.LogWarning($"Savings pot with ID {savingsPotId} not found.");
                throw new ArgumentNullException(nameof(savingsPot));
            }

            savingsPot.CurrentAmount += amount;
            var transaction = new SavingsPotTransaction
            {
                SavingsPotId = savingsPotId,
                TransactionDate = DateTime.UtcNow,
                TransactionType = "Deposit",
                Amount = amount
            };

            _context.SavingsPotTransactions.Add(transaction);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                _logger.LogError(ex, $"Error occurred while processing deposit for SavingsPot ID {savingsPotId}.");
                throw;
            }

            return transaction;
        }

        public async Task<SavingsPotTransaction> WithdrawAsync(int savingsPotId, double amount)
        {
            _logger.LogInformation($"WITHDRAW: WithdrawAsync called for SavingsPot ID {savingsPotId}");

            var savingsPot = await _context.SavingsPots.FindAsync(savingsPotId);

            if (savingsPot == null)
            {
                _logger.LogWarning($"SavingsPot with ID {savingsPotId} not found.");
                throw new ArgumentNullException(nameof(savingsPot));
            }

            if (savingsPot.CurrentAmount < amount)
            {
                _logger.LogWarning($"Insufficient funds in SavingsPot ID {savingsPotId}.");
                throw new Exception(nameof(savingsPot));
            }

            savingsPot.CurrentAmount -= amount;

            var transaction = new SavingsPotTransaction
            {
                SavingsPotId = savingsPotId,
                TransactionDate = DateTime.UtcNow,
                TransactionType = "Withdraw",
                Amount = amount
            };

            _context.SavingsPotTransactions.Add(transaction);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                _logger.LogError(ex, $"Error occurred while withdrawing from SavingsPot with ID {savingsPotId}.");
                throw;
            }

            return transaction;
        }

        public async Task<List<SavingsPotTransaction>> GetSavingsPotTransactionsByUserIdAsync(int userId)
        {
            _logger.LogInformation("GET: GetSavingsPotTransactionsByUserId called");

            try
            {
                // Retrieve transactions for all savings pots owned by the user
                return await _context.SavingsPotTransactions
                    .Include(t => t.SavingsPot)
                    .Where(t => t.SavingsPot.UserID == userId)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving transactions for the user's savings pots.");
                throw;
            }
        }

        public async Task DeleteSavingsPotTransactionsAsync(int savingsPotId)
        {
            _logger.LogInformation($"DELETE: Deleting all transactions for SavingsPot ID {savingsPotId}");

            try
            {
                var transactions = await _context.SavingsPotTransactions
                    .Where(t => t.SavingsPotId == savingsPotId)
                    .ToListAsync();

                _context.SavingsPotTransactions.RemoveRange(transactions);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while deleting transactions for SavingsPot ID {savingsPotId}.");
                throw;
            }
        }

    }
}
