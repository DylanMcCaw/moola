﻿using BudgetTracker.Common.Services;
using BudgetTracker.Savings.Models;
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
            _logger.LogInformation("DELETE: DeleteSavingsPot called");

            var savingsPot = await _context.SavingsPots.FindAsync(id);

            if (savingsPot == null)
            {
                _logger.LogWarning($"Savings pot with ID {id} not found.");
                return false;
            }

            _context.SavingsPots.Remove(savingsPot);
            await _context.SaveChangesAsync();

            return true;
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
    }
}