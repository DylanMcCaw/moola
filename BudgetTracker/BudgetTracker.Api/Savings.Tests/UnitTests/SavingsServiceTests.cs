using BudgetTracker.DbContexts;
using BudgetTracker.Savings.Entities;
using BudgetTracker.Savings.Services;
using Microsoft.EntityFrameworkCore;
using Moq;
using NUnit.Framework;
using NUnit.Framework.Legacy;

namespace BudgetTracker.Savings.Tests.UnitTests
{
    [TestFixture]
    public class SavingsServiceTests
    {
        private SavingsService _savingsService;
        private Mock<ILogger<SavingsService>> _loggerMock;
        private Mock<IBudgetTrackerDbContext> _contextMock;
        private List<SavingsPot> _savingsPots;

        [SetUp]
        public void SetUp()
        {
            _loggerMock = new Mock<ILogger<SavingsService>>();
            _contextMock = new Mock<IBudgetTrackerDbContext>();

            // Set up in-memory data
            _savingsPots = new List<SavingsPot>
            {
                new SavingsPot { Id = 1, UserID = 1, Description = "Vacation", TargetAmount = 1000 },
                new SavingsPot { Id = 2, UserID = 1, Description = "Emergency Fund", TargetAmount = 5000 }
            };

            var savingsPotsDbSetMock = new Mock<DbSet<SavingsPot>>();
            savingsPotsDbSetMock.As<IQueryable<SavingsPot>>().Setup(m => m.Provider).Returns(_savingsPots.AsQueryable().Provider);
            savingsPotsDbSetMock.As<IQueryable<SavingsPot>>().Setup(m => m.Expression).Returns(_savingsPots.AsQueryable().Expression);
            savingsPotsDbSetMock.As<IQueryable<SavingsPot>>().Setup(m => m.ElementType).Returns(_savingsPots.AsQueryable().ElementType);
            savingsPotsDbSetMock.As<IQueryable<SavingsPot>>().Setup(m => m.GetEnumerator()).Returns(_savingsPots.AsQueryable().GetEnumerator());

            savingsPotsDbSetMock.Setup(d => d.FindAsync(It.IsAny<int>())).ReturnsAsync((object[] ids) => _savingsPots.FirstOrDefault(sp => sp.Id == (int)ids[0]));

            _contextMock.Setup(c => c.SavingsPots).Returns(savingsPotsDbSetMock.Object);

            _savingsService = new SavingsService(_loggerMock.Object, _contextMock.Object);
        }

        [Test]
        public async Task GetSavingsPotAsync_WithValidId_ReturnsSavingsPot()
        {
            var result = await _savingsService.GetSavingsPotAsync(1);
            ClassicAssert.IsNotNull(result);
            ClassicAssert.AreEqual(1, result.Id);
        }

        [Test]
        public void GetSavingsPotAsync_WithInvalidId_ReturnsNull()
        {
            var result = _savingsService.GetSavingsPotAsync(99).Result;
            ClassicAssert.IsNull(result);
        }

        [Test]
        public async Task DeleteSavingsPotAsync_WithValidId_ReturnsTrue()
        {
            var result = await _savingsService.DeleteSavingsPotAsync(1);
            ClassicAssert.IsTrue(result);
            _contextMock.Verify(c => c.SaveChangesAsync(default), Times.Once);
        }

        [Test]
        public async Task DeleteSavingsPotAsync_WithInvalidId_ReturnsFalse()
        {
            var result = await _savingsService.DeleteSavingsPotAsync(99);
            ClassicAssert.IsFalse(result);
            _contextMock.Verify(c => c.SaveChangesAsync(default), Times.Never);
        }

        [Test]
        public async Task CreateSavingsPotAsync_WithValidSavingsPot_ReturnsSavingsPot()
        {
            var newSavingsPot = new SavingsPot { Id = 3, UserID = 1, Description = "New Pot", TargetAmount = 2000 };
            var result = await _savingsService.CreateSavingsPotAsync(newSavingsPot);
            ClassicAssert.IsNotNull(result);
            ClassicAssert.AreEqual(3, result.Id);
            _contextMock.Verify(c => c.SaveChangesAsync(default), Times.Once);
        }

        [Test]
        public void CreateSavingsPotAsync_WithNullSavingsPot_ThrowsArgumentNullException()
        {
            Assert.ThrowsAsync<ArgumentNullException>(() => _savingsService.CreateSavingsPotAsync(null));
        }

        [Test]
        public async Task UpdateSavingsPotAsync_WithValidId_ReturnsTrue()
        {
            var updatedSavingsPot = new SavingsPot { Id = 1, Description = "Updated Description", TargetAmount = 1500, Icon = "new-icon", IconColour = "blue", GoalDate = DateTime.Now };
            var result = await _savingsService.UpdateSavingsPotAsync(1, updatedSavingsPot);
            ClassicAssert.IsTrue(result);
            _contextMock.Verify(c => c.SaveChangesAsync(default), Times.Once);
        }

        [Test]
        public async Task UpdateSavingsPotAsync_WithInvalidId_ReturnsFalse()
        {
            var updatedSavingsPot = new SavingsPot { Id = 99, Description = "Updated Description", TargetAmount = 1500, Icon = "new-icon", IconColour = "blue", GoalDate = DateTime.Now };
            var result = await _savingsService.UpdateSavingsPotAsync(99, updatedSavingsPot);
            ClassicAssert.IsFalse(result);
            _contextMock.Verify(c => c.SaveChangesAsync(default), Times.Never);
        }
    }
}
