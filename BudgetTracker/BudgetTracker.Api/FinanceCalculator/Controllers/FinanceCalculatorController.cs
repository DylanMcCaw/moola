using BudgetTracker.FinanceCalculator.Models;
using BudgetTracker.FinanceCalculator.Services;
using Microsoft.AspNetCore.Mvc;

namespace BudgetTracker.FinanceCalculator.Controllers
{
    [ApiController]
    [Route("api/FinanceCalculator")]
    public class FinanceCalculatorController : ControllerBase
    {

        private readonly ILogger<FinanceCalculatorController> _logger;
        private readonly IFinanceCalculatorService _financeCalculatorService;
        public FinanceCalculatorController(ILogger<FinanceCalculatorController> logger, IFinanceCalculatorService FinanceCalculatorService)
        {
            _logger = logger;
            _financeCalculatorService = FinanceCalculatorService;
        }


        [HttpPost("CalculatePayments")]
        public ActionResult<FinanceSummary> CalculatePayments([FromBody] FinanceRequest request)
        {
            try
            {
                // Extract parameters from request model
                decimal totalAmount = request.TotalAmount;
                decimal deposit = request.Deposit;
                float interestRate = request.InterestRate;
                int term = request.Term;
                DateTime startDate = request.StartDate;

                // Calculate finance payments using service
                FinanceSummary summary = _financeCalculatorService.CalculateFinancePayments(totalAmount, deposit, interestRate, term, startDate);

                // Return the finance summary as ActionResult
                return Ok(summary);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error calculating finance payments.");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
