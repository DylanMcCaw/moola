namespace BudgetTracker.Incomes.Models
{
    public class IncomeForUpdateDto
    {
        public required string Description { get; set; }
        public float Amount { get; set; }
        public string? Icon { get; set; }
        public string? IconColour { get; set; }
        public int Category { get; set; }
        public DateTime StartDate { get; set; }
    }
}