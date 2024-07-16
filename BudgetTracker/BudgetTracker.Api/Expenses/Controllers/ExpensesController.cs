using AutoMapper;
using BudgetTracker.DataAccess.Entites;
using BudgetTracker.Expenses.Models;
using BudgetTracker.Expenses.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BudgetTracker.Expenses.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/Expense")]
    public class ExpensesController : ControllerBase
    {
        private readonly ILogger<ExpensesController> _logger;
        private readonly IExpensesService _expenseService;
        private readonly IMapper _mapper;

        public ExpensesController(ILogger<ExpensesController> logger, IExpensesService expenseService, IMapper mapper)
        {
            _logger = logger;
            _expenseService = expenseService ??
                throw new ArgumentNullException(nameof(expenseService)); ;
            _mapper = mapper ??
                throw new ArgumentNullException(nameof(mapper));
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
        public async Task<ActionResult<Expense>> CreateExpense(ExpenseForCreationDto newExpense)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var expenseEntity = _mapper.Map<Expense>(newExpense);

            var createdExpense = await _expenseService.CreateExpenseAsync(expenseEntity);
            if (createdExpense == null)
                return BadRequest();

            return CreatedAtAction(nameof(GetExpense), new { id = createdExpense.Id }, createdExpense);
        }

        // PUT: api/Expense/{id}
        // Updates an existing Expense by its ID
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateExpense(int id, ExpenseForUpdateDto updatedExpense)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var expenseEntity = _mapper.Map<Expense>(updatedExpense);

            var success = await _expenseService.UpdateExpenseAsync(id, expenseEntity);
            if (!success)
                return NotFound();

            return NoContent();
        }
    }
}
