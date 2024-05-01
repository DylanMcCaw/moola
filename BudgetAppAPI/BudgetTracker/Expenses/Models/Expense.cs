using System.ComponentModel.DataAnnotations;
using BudgetTracker.Common.Models;

namespace BudgetTracker.Expenses.Models
{
    public class Expense
    {
        [Key]
        public int Id { get; set; }
        public int UserID { get; set; }
        public required string Description { get; set; }
        public double Amount { get; set; }
        public Frequency Frequency { get; set; }
        public ExpenseCategory Category { get; set; }
        public DateTime StartDate { get; set; }
    }
}
