using BudgetTracker.DbContexts;
using BudgetTracker.Incomes.Entities;
using BudgetTracker.Incomes.Services;
using BudgetTracker.Savings.Entities;
using Microsoft.EntityFrameworkCore;
using Moq;
using NUnit.Framework;
using NUnit.Framework.Legacy;

namespace BudgetTracker.Incomes.Test.UnitTests
{
    [TestFixture]
    public class IncomeServiceTests
        {
            private IncomeService _incomeService;
            private Mock<ILogger<IncomeService>> _loggerMock;
            private Mock<IBudgetTrackerDbContext> _contextMock;
            private List<Income> _incomes;

            [SetUp]
            public void SetUp()
            {
                _loggerMock = new Mock<ILogger<IncomeService>>();
                _contextMock = new Mock<IBudgetTrackerDbContext>();

                // Set up in-memory data
                _incomes = new List<Income>
            {
                new Income { Id = 1, UserID = 1, Description = "Salary", Category = IncomeCategory.Salary, StartDate = DateTime.Now, Icon = "icon1", IconColour = "red" },
                new Income { Id = 2, UserID = 1, Description = "Freelancing", Category = IncomeCategory.Bonus, StartDate = DateTime.Now, Icon = "icon2", IconColour = "blue" }
            };

                var incomesDbSetMock = new Mock<DbSet<Income>>();
                incomesDbSetMock.As<IQueryable<SavingsPot>>().Setup(m => m.Provider).Returns(_incomes.AsQueryable().Provider);
                incomesDbSetMock.As<IQueryable<Income>>().Setup(m => m.Expression).Returns(_incomes.AsQueryable().Expression);
                incomesDbSetMock.As<IQueryable<Income>>().Setup(m => m.ElementType).Returns(_incomes.AsQueryable().ElementType);
                incomesDbSetMock.As<IQueryable<Income>>().Setup(m => m.GetEnumerator()).Returns(_incomes.AsQueryable().GetEnumerator());

                incomesDbSetMock.Setup(d => d.FindAsync(It.IsAny<int>())).ReturnsAsync((object[] ids) => _incomes.FirstOrDefault(sp => sp.Id == (int)ids[0]));

                _contextMock.Setup(c => c.Incomes).Returns(incomesDbSetMock.Object);

                _incomeService = new IncomeService(_loggerMock.Object, _contextMock.Object);
            }

            [Test]
            public async Task GetIncomeAsync_WithValidId_ReturnsIncome()
            {
                var result = await _incomeService.GetIncomeAsync(1);
                ClassicAssert.IsNotNull(result);
                ClassicAssert.AreEqual(1, result.Id);
            }

            [Test]
            public void GetIncomeAsync_WithInvalidId_ReturnsNull()
            {
                var result = _incomeService.GetIncomeAsync(99).Result;
                ClassicAssert.IsNull(result);
            }

            [Test]
            public async Task DeleteIncomeAsync_WithValidId_ReturnsTrue()
            {
                var result = await _incomeService.DeleteIncomeAsync(1);
                ClassicAssert.IsTrue(result);
                _contextMock.Verify(c => c.SaveChangesAsync(default), Times.Once);
            }

            [Test]
            public async Task DeleteIncomeAsync_WithInvalidId_ReturnsFalse()
            {
                var result = await _incomeService.DeleteIncomeAsync(99);
                ClassicAssert.IsFalse(result);
                _contextMock.Verify(c => c.SaveChangesAsync(default), Times.Never);
            }

            [Test]
            public async Task CreateIncomeAsync_WithValidIncome_ReturnsIncome()
            {
                var newIncome = new Income { Id = 3, UserID = 1, Description = "Investment", Category = IncomeCategory.Salary, StartDate = DateTime.Now, Icon = "icon3", IconColour = "green" };
                var result = await _incomeService.CreateIncomeAsync(newIncome);
                ClassicAssert.IsNotNull(result);
                ClassicAssert.AreEqual(3, result.Id);
                _contextMock.Verify(c => c.SaveChangesAsync(default), Times.Once);
            }

            [Test]
            public void CreateIncomeAsync_WithNullIncome_ThrowsArgumentNullException()
            {
                Assert.ThrowsAsync<ArgumentNullException>(() => _incomeService.CreateIncomeAsync(null));
            }

            [Test]
            public async Task UpdateIncomeAsync_WithValidId_ReturnsTrue()
            {
                var updatedIncome = new Income { Id = 1, Description = "Updated Salary", Category = IncomeCategory.Salary, StartDate = DateTime.Now, Icon = "new-icon", IconColour = "blue" };
                var result = await _incomeService.UpdateIncomeAsync(1, updatedIncome);
                ClassicAssert.IsTrue(result);
                _contextMock.Verify(c => c.SaveChangesAsync(default), Times.Once);
            }

            [Test]
            public async Task UpdateIncomeAsync_WithInvalidId_ReturnsFalse()
            {
                var updatedIncome = new Income { Id = 99, Description = "Updated Income", Category = IncomeCategory.Salary, StartDate = DateTime.Now, Icon = "new-icon", IconColour = "yellow" };
                var result = await _incomeService.UpdateIncomeAsync(99, updatedIncome);
                ClassicAssert.IsFalse(result);
                _contextMock.Verify(c => c.SaveChangesAsync(default), Times.Never);
            }
        }

    }

