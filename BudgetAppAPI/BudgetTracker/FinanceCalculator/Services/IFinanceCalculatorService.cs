using BudgetTracker.FinanceCalculator.Models;

namespace BudgetTracker.FinanceCalculator.Services
{
    public interface IFinanceCalculatorService
    {
        /// <summary>
        /// Calculates the payments for a using the total finance amount, depost, APR % and term (years)
        /// </summary>
        /// <param name="totalAmount">The total amount of the finance plan</param>
        /// <param name="deposit">The total deposit of the finance plan</param>
        /// <param name="interestRate">The total interest rate % of the finance plan</param>
        /// <param name="term">The term (years) of the finance plan</param>
        /// <param name="startDate">The start date of the finance plan</param>
        /// <returns>The Expense with the specified ID, or null if not found.</returns>
        public FinanceSummary CalculateFinancePayments(decimal totalAmount, decimal deposit, float interestRate, int term, DateTime startDate);

    }
}
