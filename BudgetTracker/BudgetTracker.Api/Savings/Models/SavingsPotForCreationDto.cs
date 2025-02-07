﻿namespace BudgetTracker.Savings.Models
{
    public class SavingsPotForCreationDto
    {
        public int UserID { get; set; }
        public required string Description { get; set; }
        public double TargetAmount { get; set; }
        public string? Icon { get; set; }
        public string? IconColour { get; set; }
        public DateTime GoalDate { get; set; }
    }
}
