using AutoMapper;
using BudgetTracker.DataAccess.Entites;
using BudgetTracker.Savings.Models;
using BudgetTracker.Savings.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BudgetTracker.Savings.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class SavingsController : ControllerBase
    {
        private readonly ILogger<SavingsController> _logger;
        private readonly ISavingsService _savingsService;
        private readonly IMapper _mapper;

        public SavingsController(ILogger<SavingsController> logger, ISavingsService savingsService, IMapper mapper)
        {
            _logger = logger;
            _savingsService = savingsService ??
                throw new ArgumentNullException(nameof(savingsService)); ;
            _mapper = mapper ??
                throw new ArgumentNullException(nameof(mapper));
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
            return Ok(savingsPots ?? Enumerable.Empty<SavingsPot>());
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
        public async Task<ActionResult<SavingsPot>> CreateSavingsPot(SavingsPotForCreationDto savingsPot)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var savingsPotEntity = _mapper.Map<SavingsPot>(savingsPot);

            var createdSavingsPot = await _savingsService.CreateSavingsPotAsync(savingsPotEntity);
            if (createdSavingsPot == null)
                return BadRequest();

            return CreatedAtAction(nameof(GetSavingsPot), new { id = createdSavingsPot.Id }, createdSavingsPot);
        }

        // PUT: api/SavingsPot/{id}
        // Updates an existing Savings Pot by its ID
        [HttpPut("{id}")]
        public async Task<ActionResult<SavingsPot>> UpdateSavingsPot(int id, SavingsPotForUpdate updatedSavingsPot)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var savingsPotEntity = _mapper.Map<SavingsPot>(updatedSavingsPot);

            var savingsPot = await _savingsService.UpdateSavingsPotAsync(id, savingsPotEntity);
            if (savingsPot == null)
                return NotFound();

            return savingsPot;
        }

        // POST: api/Savings/Deposit/{id}
        [HttpPost("Deposit/{id}")]
        public async Task<ActionResult<SavingsPotTransaction>> Deposit(int id, SavingsPotTransactionDto savingsPotTransactionDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var transaction = await _savingsService.DepositAsync(id, savingsPotTransactionDto.Amount);
            if (transaction == null)
                return NotFound();

            return transaction;
        }

        // POST: api/Savings/Withdraw/{id}
        [HttpPost("Withdraw/{id}")]
        public async Task<ActionResult<SavingsPotTransaction>> Withdraw(int id, SavingsPotTransactionDto savingsPotTransactionDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var transaction = await _savingsService.WithdrawAsync(id, savingsPotTransactionDto.Amount);
            if (transaction == null)
                return NotFound();

            return transaction;
        }

        // GET: api/Savings/{potId}/Transactions
        [HttpGet("User/{userId}/Transactions")]
        public async Task<ActionResult<IEnumerable<SavingsPotTransaction>>> GetSavingsPotTransactionsByUserId(int userId)
        {
            var transactions = await _savingsService.GetSavingsPotTransactionsByUserIdAsync(userId);
            return Ok(transactions ?? Enumerable.Empty<SavingsPotTransaction>());
        }
    }
}
