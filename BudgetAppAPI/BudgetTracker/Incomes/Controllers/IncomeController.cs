using BudgetTracker.Incomes.Models;
using BudgetTracker.Incomes.Services;
using Microsoft.AspNetCore.Mvc;

namespace BudgetTracker.Incomes.Controllers
{
    [ApiController]
    [Route("api/Income")]
    public class IncomeController : ControllerBase
    {
        private readonly ILogger<IncomeController> _logger;
        private readonly IIncomeService _incomeService;

        public IncomeController(ILogger<IncomeController> logger, IIncomeService Incomeervice)
        {
            _logger = logger;
            _incomeService = Incomeervice;
        }

        // GET: api/Income/{id}
        // Retrieves a Income by its ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Income>> GetIncome(int id)
        {
            var Income = await _incomeService.GetIncomeAsync(id);
            if (Income == null)
                return NotFound();

            return Income;
        }

        // GET: api/Income/User/{id}
        // Retrieves all Income s belonging to a specific user
        [HttpGet("User/{id}")]
        public async Task<ActionResult<IEnumerable<Income>>> GetUsersIncome(int id)
        {
            var Income = await _incomeService.GetUsersIncomeAsync(id);
            if (Income == null || !Income.Any())
                return NotFound();

            return Ok(Income);
        }

        // DELETE: api/Income/{id}
        // Deletes an Income by its ID
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIncome(int id)
        {
            var success = await _incomeService.DeleteIncomeAsync(id);
            if (!success)
                return NotFound();

            return NoContent();
        }

        // POST: api/Income
        // Creates a new Income 
        [HttpPost]
        public async Task<ActionResult<Income>> CreateIncome(Income Income)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var createdIncome = await _incomeService.CreateIncomeAsync(Income);
            if (createdIncome == null)
                return BadRequest();

            return CreatedAtAction(nameof(GetIncome), new { id = createdIncome.Id }, createdIncome);
        }

        // PUT: api/Income/{id}
        // Updates an existing Income by its ID
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateIncome(int id, Income updatedIncome)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var success = await _incomeService.UpdateIncomeAsync(id, updatedIncome);
            if (!success)
                return NotFound();

            return NoContent();
        }
    }
}
