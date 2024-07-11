namespace BudgetTracker.Savings.Models
{
    public class SavingsPotForUpdate
    {
        public string Description { get; set; }
        public double TargetAmount { get; set; }
        public string? Icon { get; set; }
        public string? IconColour { get; set; }
        public DateTime GoalDate { get; set; }
    }
}
