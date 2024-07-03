namespace BudgetTracker.FinanceCalculator.Models
{
    public class FinanceRequest
    {
        public decimal TotalAmount { get; set; }
        public decimal Deposit { get; set; }
        public float InterestRate { get; set; }
        public int Term { get; set; }
        public DateTime StartDate { get; set; }
    }
}
