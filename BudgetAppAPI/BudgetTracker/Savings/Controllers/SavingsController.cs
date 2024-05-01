using BudgetTracker.Savings.Models;
using BudgetTracker.Savings.Services;
using Microsoft.AspNetCore.Mvc;

namespace BudgetTracker.Savings.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SavingsController : ControllerBase
    {
        private readonly ILogger<SavingsController> _logger;
        private readonly ISavingsService _savingsService;

        public SavingsController(ILogger<SavingsController> logger, ISavingsService savingsService)
        {
            _logger = logger;
            _savingsService = savingsService;
        }

        // GET: api/Savings/{id}
        // Retrieves a savings pot by its ID
        [HttpGet("{id}")]
        public async Task<ActionResult<SavingsPot>> GetSavingsPot(int id)
        {
            var savingsPot = await _savingsService.GetSavingsPotAsync(id);
            if (savingsPot == null)
                return NotFound();

            return savingsPot;
        }

        // GET: api/Savings/User/{id}
        // Retrieves all savings pots belonging to a specific user
        [HttpGet("User/{id}")]
        public async Task<ActionResult<IEnumerable<SavingsPot>>> GetUsersSavingsPots(int id)
        {
            var savingsPots = await _savingsService.GetUsersSavingsPotsAsync(id);
            if (savingsPots == null || !savingsPots.Any())
                return NotFound();

            return Ok(savingsPots);
        }

        // DELETE: api/Savings/{id}
        // Deletes a savings pot by its ID
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSavingsPot(int id)
        {
            var success = await _savingsService.DeleteSavingsPotAsync(id);
            if (!success)
                return NotFound();

            return NoContent();
        }

        // POST: api/Savings
        // Creates a new savings pot
        [HttpPost]
        public async Task<ActionResult<SavingsPot>> CreateSavingsPot(SavingsPot savingsPot)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var createdSavingsPot = await _savingsService.CreateSavingsPotAsync(savingsPot);
            if (createdSavingsPot == null)
                return BadRequest();

            return CreatedAtAction(nameof(GetSavingsPot), new { id = createdSavingsPot.Id }, createdSavingsPot);
        }
    }
}
