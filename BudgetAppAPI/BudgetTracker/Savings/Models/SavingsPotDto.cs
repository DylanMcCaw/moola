using BudgetTracker.Common.Models;
using BudgetTracker.Savings.Entities;

namespace BudgetTracker.Savings.Models
{
    public class SavingsPotDto
    {
        public int UserID { get; set; }
        public string Description { get; set; }
        public double TargetAmount { get; set; }
        public string? Icon { get; set; }
        public string? IconColour { get; set; }
        public DateTime GoalDate { get; set; }
    }
}
