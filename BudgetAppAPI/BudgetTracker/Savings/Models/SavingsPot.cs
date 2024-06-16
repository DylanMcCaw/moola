using System.ComponentModel.DataAnnotations;
using BudgetTracker.Common.Models;

namespace BudgetTracker.Savings.Models
{
    public class SavingsPot
    {
        [Key]
        public int Id { get; set; }
        public int UserID { get; set; }
        public required string Description { get; set; }
        public double TargetAmount { get; set; }
        public double CurrentAmount { get; set; }
        public string? Icon { get; set; }
        public string? IconColour { get; set; }
        public Frequency DepositFrequency { get; set; }
        public DateTime GoalDate { get; set; }
        public SavingsPotStatus Status { get; set; }
    }
}
