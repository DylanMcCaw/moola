namespace BudgetTracker.FinanceCalculator.Models
{
    public class Payment
    {
        public decimal PaymentAmount { get; set; }
        public DateTime DateDue { get; set; }
        public decimal NewAmountDue { get; set; }
    }
}
