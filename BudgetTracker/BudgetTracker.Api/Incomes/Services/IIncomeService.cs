using BudgetTracker.DataAccess.Entites;

namespace BudgetTracker.Incomes.Services
{
    /// <summary>
    /// Interface for managing Income operations.
    /// </summary>
    public interface IIncomeService
    {
        /// <summary>
        /// Retrieves a Income by its ID.
        /// </summary>
        /// <param name="id">The ID of the Income  to retrieve.</param>
        /// <returns>The Income with the specified ID, or null if not found.</returns>
        Task<Income> GetIncomeAsync(int id);

        /// <summary>
        /// Retrieves all Incomes belonging to a specific user.
        /// </summary>
        /// <param name="userId">The ID of the user.</param>
        /// <returns>A list of Income s belonging to the specified user.</returns>
        Task<List<Income>> GetUsersIncomeAsync(int userId);

        /// <summary>
        /// Deletes an Income by its ID.
        /// </summary>
        /// <param name="id">The ID of the Income to delete.</param>
        /// <returns>True if the Income  was successfully deleted, otherwise false.</returns>
        Task<bool> DeleteIncomeAsync(int id);

        /// <summary>
        /// Creates a new Income.
        /// </summary>
        /// <param name="Income">The Income to create.</param>
        /// <returns>The newly created Income.</returns>
        Task<Income> CreateIncomeAsync(Income Income);


        /// <summary>
        /// Updates an existing Income.
        /// </summary>
        /// <param name="id">The ID of the Income to update.</param>
        /// <param name="updatedIncome">The updated Income.</param>
        /// <returns>True if the Income was successfully updated, otherwise false.</returns>
        Task<bool> UpdateIncomeAsync(int id, Income updatedIncome);
    }
}
