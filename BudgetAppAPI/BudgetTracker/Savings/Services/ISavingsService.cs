using BudgetTracker.Expenses.Models;
using BudgetTracker.Savings.Models;

namespace BudgetTracker.Savings.Services
{
    /// <summary>
    /// Interface for managing savings operations.
    /// </summary>
    public interface ISavingsService
    {
        /// <summary>
        /// Retrieves a savings pot by its ID.
        /// </summary>
        /// <param name="id">The ID of the savings pot to retrieve.</param>
        /// <returns>The savings pot with the specified ID, or null if not found.</returns>
        Task<SavingsPot> GetSavingsPotAsync(int id);

        /// <summary>
        /// Retrieves all savings pots belonging to a specific user.
        /// </summary>
        /// <param name="userId">The ID of the user.</param>
        /// <returns>A list of savings pots belonging to the specified user.</returns>
        Task<List<SavingsPot>> GetUsersSavingsPotsAsync(int userId);

        /// <summary>
        /// Deletes a savings pot by its ID.
        /// </summary>
        /// <param name="id">The ID of the savings pot to delete.</param>
        /// <returns>True if the savings pot was successfully deleted, otherwise false.</returns>
        Task<bool> DeleteSavingsPotAsync(int id);

        /// <summary>
        /// Creates a new savings pot.
        /// </summary>
        /// <param name="savingsPot">The savings pot to create.</param>
        /// <returns>The newly created savings pot.</returns>
        Task<SavingsPot> CreateSavingsPotAsync(SavingsPot savingsPot);

        /// <summary>
        /// Updates an existing savings pot.
        /// </summary>
        /// <param name="id">The ID of the savings pot to update.</param>
        /// <param name="updatedSavingsPot">The updated savings pot.</param>
        /// <returns>True if the savings pot was successfully updated, otherwise false.</returns>
        Task<bool> UpdateSavingsPotAsync(int id, SavingsPot updatedSavingsPot);
    }
}
