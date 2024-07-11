using BudgetTracker.FinanceCalculator.Models;

namespace BudgetTracker.FinanceCalculator.Services
{
    public class FinanceCalculatorService : IFinanceCalculatorService
    {
        public FinanceSummary CalculateFinancePayments(decimal totalAmount, decimal deposit, float interestRate, int term, DateTime startDate) 
        {
            var financedAmount = totalAmount - deposit;
            var monthlyInterestRate = (decimal)interestRate / 12;
            var totalDue = financedAmount * (1 + monthlyInterestRate);
            var monthlyPayment = totalDue / (term * 12);
            var payments = new List<Payment>();

            for (int i = 1; i <= (term * 12); i++) 
            { 
                var paymentAmount = totalDue < monthlyPayment ? totalDue : monthlyPayment;
                var newTotalDue = totalDue -= paymentAmount;
                var payment = new Payment() 
                { 
                    PaymentAmount = Math.Round(paymentAmount, 2),
                    DateDue = startDate.AddMonths(i-1),
                    NewAmountDue = Math.Round(newTotalDue, 2),
                };
                totalDue = newTotalDue;
                payments.Add(payment);
            }

            return new FinanceSummary() 
            { 
                TotalAmount = totalAmount,
                Deposit = deposit,
                InterestRate = interestRate,
                Term = term,
                Payments = payments 
            };
        }
    }
}
