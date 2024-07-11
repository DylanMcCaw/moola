using BudgetTracker.Expenses.Entities;

namespace BudgetTracker.Expenses.Services
{
    /// <summary>
    /// Interface for managing Expense operations.
    /// </summary>
    public interface IExpensesService
    {
        /// <summary>
        /// Retrieves a Expense  by its ID.
        /// </summary>
        /// <param name="id">The ID of the Expense  to retrieve.</param>
        /// <returns>The Expense with the specified ID, or null if not found.</returns>
        Task<Expense> GetExpenseAsync(int id);

        /// <summary>
        /// Retrieves all Expense s belonging to a specific user.
        /// </summary>
        /// <param name="userId">The ID of the user.</param>
        /// <returns>A list of Expense s belonging to the specified user.</returns>
        Task<List<Expense>> GetUsersExpensesAsync(int userId);

        /// <summary>
        /// Deletes an Expense by its ID.
        /// </summary>
        /// <param name="id">The ID of the Expense to delete.</param>
        /// <returns>True if the Expense  was successfully deleted, otherwise false.</returns>
        Task<bool> DeleteExpenseAsync(int id);

        /// <summary>
        /// Creates a new Expense.
        /// </summary>
        /// <param name="expense">The Expense to create.</param>
        /// <returns>The newly created Expense.</returns>
        Task<Expense> CreateExpenseAsync(Expense expense);


        /// <summary>
        /// Updates an existing Expense.
        /// </summary>
        /// <param name="id">The ID of the Expense to update.</param>
        /// <param name="updatedExpense">The updated expense.</param>
        /// <returns>True if the Expense was successfully updated, otherwise false.</returns>
        Task<bool> UpdateExpenseAsync(int id, Expense updatedExpense);
    }
}
