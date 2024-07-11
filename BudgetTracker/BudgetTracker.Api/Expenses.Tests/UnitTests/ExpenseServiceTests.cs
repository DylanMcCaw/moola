using BudgetTracker.DbContexts;
using BudgetTracker.Expenses.Entities;
using BudgetTracker.Expenses.Services;
using Microsoft.EntityFrameworkCore;
using Moq;
using NUnit.Framework;
using NUnit.Framework.Legacy;

namespace BudgetTracker.Expenses.Tests.UnitTests
{
    [TestFixture]
    public class ExpensesServiceTests
    {
        private ExpensesService _expensesService;
        private Mock<ILogger<ExpensesService>> _loggerMock;
        private Mock<IBudgetTrackerDbContext> _contextMock;
        private List<Expense> _expenses;

        [SetUp]
        public void SetUp()
        {
            _loggerMock = new Mock<ILogger<ExpensesService>>();
            _contextMock = new Mock<IBudgetTrackerDbContext>();

            // Set up in-memory data
            _expenses = new List<Expense>
        {
            new Expense { Id = 1, UserID = 1, Description = "Rent", Amount = 1000, Category = ExpenseCategory.Housing, StartDate = DateTime.Now, Icon = "icon1", IconColour = "red" },
            new Expense { Id = 2, UserID = 2, Description = "Groceries", Amount = 200, Category = ExpenseCategory.Food, StartDate = DateTime.Now, Icon = "icon2", IconColour = "blue" }
        };

            var expensesDbSetMock = new Mock<DbSet<Expense>>();
            expensesDbSetMock.As<IQueryable<Expense>>().Setup(m => m.Provider).Returns(_expenses.AsQueryable().Provider);
            expensesDbSetMock.As<IQueryable<Expense>>().Setup(m => m.Expression).Returns(_expenses.AsQueryable().Expression);
            expensesDbSetMock.As<IQueryable<Expense>>().Setup(m => m.ElementType).Returns(_expenses.AsQueryable().ElementType);
            expensesDbSetMock.As<IQueryable<Expense>>().Setup(m => m.GetEnumerator()).Returns(_expenses.AsQueryable().GetEnumerator());

            expensesDbSetMock.Setup(d => d.FindAsync(It.IsAny<int>())).ReturnsAsync((object[] ids) => _expenses.FirstOrDefault(sp => sp.Id == (int)ids[0]));

            _contextMock.Setup(c => c.Expenses).Returns(expensesDbSetMock.Object);

            _expensesService = new ExpensesService(_loggerMock.Object, _contextMock.Object);
        }

        [Test]
        public async Task GetExpenseAsync_WithValidId_ReturnsExpense()
        {
            var result = await _expensesService.GetExpenseAsync(1);
            ClassicAssert.IsNotNull(result);
            ClassicAssert.AreEqual(1, result.Id);
        }

        [Test]
        public void GetExpenseAsync_WithInvalidId_ReturnsNull()
        {
            var result = _expensesService.GetExpenseAsync(99).Result;
            ClassicAssert.IsNull(result);
        }

        [Test]
        public async Task DeleteExpenseAsync_WithValidId_ReturnsTrue()
        {
            var result = await _expensesService.DeleteExpenseAsync(1);
            ClassicAssert.IsTrue(result);
            _contextMock.Verify(c => c.SaveChangesAsync(default), Times.Once);
        }

        [Test]
        public async Task DeleteExpenseAsync_WithInvalidId_ReturnsFalse()
        {
            var result = await _expensesService.DeleteExpenseAsync(99);
            ClassicAssert.IsFalse(result);
            _contextMock.Verify(c => c.SaveChangesAsync(default), Times.Never);
        }

        [Test]
        public async Task CreateExpenseAsync_WithValidExpense_ReturnsExpense()
        {
            var newExpense = new Expense { Id = 3, UserID = 3, Description = "Utilities", Amount = 150, Category = ExpenseCategory.Housing, StartDate = DateTime.Now, Icon = "icon3", IconColour = "green" };
            var result = await _expensesService.CreateExpenseAsync(newExpense);
            ClassicAssert.IsNotNull(result);
            ClassicAssert.AreEqual(3, result.Id);
            _contextMock.Verify(c => c.SaveChangesAsync(default), Times.Once);
        }

        [Test]
        public void CreateExpenseAsync_WithNullExpense_ThrowsArgumentNullException()
        {
            Assert.ThrowsAsync<ArgumentNullException>(() => _expensesService.CreateExpenseAsync(null));
        }

        [Test]
        public async Task UpdateExpenseAsync_WithValidId_ReturnsTrue()
        {
            var updatedExpense = new Expense { Id = 1, Description = "Updated Rent", Amount = 1200, Category = ExpenseCategory.Housing, StartDate = DateTime.Now, Icon = "new-icon", IconColour = "blue" };
            var result = await _expensesService.UpdateExpenseAsync(1, updatedExpense);
            ClassicAssert.IsTrue(result);
            _contextMock.Verify(c => c.SaveChangesAsync(default), Times.Once);
        }

        [Test]
        public async Task UpdateExpenseAsync_WithInvalidId_ReturnsFalse()
        {
            var updatedExpense = new Expense { Id = 99, Description = "Updated Expense", Amount = 300, Category = ExpenseCategory.Housing, StartDate = DateTime.Now, Icon = "new-icon", IconColour = "yellow" };
            var result = await _expensesService.UpdateExpenseAsync(99, updatedExpense);
            ClassicAssert.IsFalse(result);
            _contextMock.Verify(c => c.SaveChangesAsync(default), Times.Never);
        }
    }
}

