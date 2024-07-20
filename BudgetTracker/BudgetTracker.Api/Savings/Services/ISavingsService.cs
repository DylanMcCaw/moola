using BudgetTracker.DataAccess.Entites;

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
        Task<SavingsPot> UpdateSavingsPotAsync(int id, SavingsPot updatedSavingsPot);


        /// <summary>
        /// Adds a deposit to the specified savings pot.
        /// </summary>
        /// <param name="savingsPotId">The ID of the savings pot to deposit to.</param>
        /// <param name="amount">The amount to deposit.</param>
        /// <returns>True if the deposit was successfully added, otherwise false.</returns>
        Task<SavingsPotTransaction> DepositAsync(int savingsPotId, double amount);

        /// <summary>
        /// Withdraws an amount from the specified savings pot.
        /// </summary>
        /// <param name="savingsPotId">The ID of the savings pot to withdraw from.</param>
        /// <param name="amount">The amount to withdraw.</param>
        /// <returns>True if the amount was successfully withdrawn, otherwise false.</returns>
        Task<SavingsPotTransaction> WithdrawAsync(int savingsPotId, double amount);

        Task<List<SavingsPotTransaction>> GetSavingsPotTransactionsByUserIdAsync(int userId);
    }
}
