using BudgetTracker.Expenses.Models;
using BudgetTracker.Expenses.Services;
using Microsoft.AspNetCore.Mvc;

namespace BudgetTracker.Expenses.Controllers
{
    [ApiController]
    [Route("api/Expense")]
    public class ExpensesController : ControllerBase
    {
        private readonly ILogger<ExpensesController> _logger;
        private readonly IExpensesService _ExpenseService;

        public ExpensesController(ILogger<ExpensesController> logger, IExpensesService ExpenseService)
        {
            _logger = logger;
            _ExpenseService = ExpenseService;
        }

        // GET: api/Expense/{id}
        // Retrieves a Expense by its ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Expense>> GetExpense(int id)
        {
            var Expense = await _ExpenseService.GetExpenseAsync(id);
            if (Expense == null)
                return NotFound();

            return Expense;
        }

        // GET: api/Expense/User/{id}
        // Retrieves all Expense s belonging to a specific user
        [HttpGet("User/{id}")]
        public async Task<ActionResult<IEnumerable<Expense>>> GetUsersExpenses(int id)
        {
            var Expenses = await _ExpenseService.GetUsersExpensesAsync(id);
            if (Expenses == null || !Expenses.Any())
                return NotFound();

            return Ok(Expenses);
        }

        // DELETE: api/Expense/{id}
        // Deletes an Expense by its ID
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExpense(int id)
        {
            var success = await _ExpenseService.DeleteExpenseAsync(id);
            if (!success)
                return NotFound();

            return NoContent();
        }

        // POST: api/Expense
        // Creates a new Expense 
        [HttpPost]
        public async Task<ActionResult<Expense>> CreateExpense(Expense Expense)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var createdExpense = await _ExpenseService.CreateExpenseAsync(Expense);
            if (createdExpense == null)
                return BadRequest();

            return CreatedAtAction(nameof(GetExpense), new { id = createdExpense.Id }, createdExpense);
        }
    }
}
