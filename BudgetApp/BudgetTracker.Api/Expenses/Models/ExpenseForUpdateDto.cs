namespace BudgetTracker.Expenses.Models
{
    public class ExpenseForUpdateDto
    {
        public required string Description { get; set; }
        public float Amount { get; set; }
        public string? Icon { get; set; }
        public string? IconColour { get; set; }
        public int Frequency { get; set; }
        public int Category { get; set; }
        public DateTime StartDate { get; set; }
    }
}
