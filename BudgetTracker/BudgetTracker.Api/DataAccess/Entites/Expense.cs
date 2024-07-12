using System.ComponentModel.DataAnnotations;
using BudgetTracker.Common.Models;

namespace BudgetTracker.DataAccess.Entites
{
    public class Expense
    {
        [Key]
        public int Id { get; set; }
        public int UserID { get; set; }
        public required string Description { get; set; }
        public float Amount { get; set; }
        public string? Icon { get; set; }
        public string? IconColour { get; set; }
        public Frequency Frequency { get; set; }
        public ExpenseCategory Category { get; set; }
        public DateTime StartDate { get; set; }
    }
}
