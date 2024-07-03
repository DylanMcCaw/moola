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
        private readonly IExpensesService _expenseService;

        public ExpensesController(ILogger<ExpensesController> logger, IExpensesService ExpenseService)
        {
            _logger = logger;
            _expenseService = ExpenseService;
        }

        // GET: api/Expense/{id}
        // Retrieves a Expense by its ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Expense>> GetExpense(int id)
        {
            var expence = await _expenseService.GetExpenseAsync(id);
            if (expence == null)
                return NotFound();

            return expence;
        }

        // GET: api/Expense/User/{id}
        // Retrieves all Expense s belonging to a specific user
        [HttpGet("User/{id}")]
        public async Task<ActionResult<IEnumerable<Expense>>> GetUsersExpenses(int id)
        {
            var expenses = await _expenseService.GetUsersExpensesAsync(id);
            if (expenses == null || !expenses.Any())
                return NotFound();

            return Ok(expenses);
        }

        // DELETE: api/Expense/{id}
        // Deletes an Expense by its ID
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExpense(int id)
        {
            var success = await _expenseService.DeleteExpenseAsync(id);
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

            var createdExpense = await _expenseService.CreateExpenseAsync(Expense);
            if (createdExpense == null)
                return BadRequest();

            return CreatedAtAction(nameof(GetExpense), new { id = createdExpense.Id }, createdExpense);
        }

        // PUT: api/Expense/{id}
        // Updates an existing Expense by its ID
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateExpense(int id, Expense updatedExpense)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var success = await _expenseService.UpdateExpenseAsync(id, updatedExpense);
            if (!success)
                return NotFound();

            return NoContent();
        }
    }
}
