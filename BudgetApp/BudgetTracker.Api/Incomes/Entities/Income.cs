using System.ComponentModel.DataAnnotations;
using BudgetTracker.Common.Models;

namespace BudgetTracker.Incomes.Entities
{
    public class Income
    {
        [Key]
        public int Id { get; set; }
        public int UserID { get; set; }
        public required string Description { get; set; }
        public float Amount { get; set; }
        public string? Icon { get; set; }
        public string? IconColour { get; set; }
        public IncomeCategory Category { get; set; }
        public DateTime StartDate { get; set; }
    }
}
