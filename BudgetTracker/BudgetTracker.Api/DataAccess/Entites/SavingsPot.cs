using System.ComponentModel.DataAnnotations;
using BudgetTracker.Common.Models;

namespace BudgetTracker.DataAccess.Entites
{
    public class SavingsPot
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int UserID { get; set; }
        [Required]
        [MaxLength(50)]
        public required string Description { get; set; }
        public double TargetAmount { get; set; }
        public double CurrentAmount { get; set; }
        [Required]
        public string? Icon { get; set; }
        [Required]
        public string? IconColour { get; set; }
        [Required]
        public DateTime GoalDate { get; set; }
        [Required]
        public bool isGoalComplete { get; set; }
    }
}
