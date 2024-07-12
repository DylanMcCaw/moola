using NUnit.Framework;
using System;
using System.Collections.Generic;
using BudgetTracker.FinanceCalculator.Models;
using BudgetTracker.FinanceCalculator.Services;
using NUnit.Framework.Legacy;

namespace BudgetTracker.Tests.FinanceCalculator.Test
{
    [TestFixture]
    public class FinanceCalculatorServiceTests
    {
        private FinanceCalculatorService _financeService;

        [SetUp]
        public void Setup()
        {
            _financeService = new FinanceCalculatorService();
        }

        [Test]
        public void CalculateFinancePayments_BasicCase()
        {
            // Arrange
            decimal totalAmount = 10000m;
            decimal deposit = 2000m;
            float interestRate = 0.05f;
            int term = 5; // 5 years
            DateTime startDate = new DateTime(2024, 1, 1);

            // Act
            FinanceSummary summary = _financeService.CalculateFinancePayments(totalAmount, deposit, interestRate, term, startDate);

            // Assert
            ClassicAssert.IsNotNull(summary);
            ClassicAssert.IsNotNull(summary.Payments);
            ClassicAssert.AreEqual(term * 12, summary.Payments.Count); // Including initial payment
        }

        [Test]
        public void CalculateFinancePayments_ZeroDeposit()
        {
            // Arrange
            decimal totalAmount = 10000m;
            decimal deposit = 0m;
            float interestRate = 0.05f;
            int term = 5; // 5 years
            DateTime startDate = new DateTime(2024, 1, 1);

            // Act
            FinanceSummary summary = _financeService.CalculateFinancePayments(totalAmount, deposit, interestRate, term, startDate);

            // ClassicAssert
            ClassicAssert.IsNotNull(summary);
            ClassicAssert.IsNotNull(summary.Payments);
            ClassicAssert.AreEqual(term * 12, summary.Payments.Count); // Including initial payment
        }

        [Test]
        public void CalculateFinancePayments_ZeroInterestRate()
        {
            // Arrange
            decimal totalAmount = 10000m;
            decimal deposit = 2000m;
            float interestRate = 0f; // No interest
            int term = 5; // 5 years
            DateTime startDate = new DateTime(2024, 1, 1);

            // Act
            FinanceSummary summary = _financeService.CalculateFinancePayments(totalAmount, deposit, interestRate, term, startDate);

            // Assert
            ClassicAssert.IsNotNull(summary);
            ClassicAssert.IsNotNull(summary.Payments);
            ClassicAssert.AreEqual(term * 12, summary.Payments.Count); // Including initial payment
        }

        [Test]
        public void CalculateFinancePayments_ShortTerm()
        {
            // Arrange
            decimal totalAmount = 10000m;
            decimal deposit = 2000m;
            float interestRate = 0.05f;
            int term = 1; // 1 year
            DateTime startDate = new DateTime(2024, 1, 1);

            // Act
            FinanceSummary summary = _financeService.CalculateFinancePayments(totalAmount, deposit, interestRate, term, startDate);

            // Assert
            ClassicAssert.IsNotNull(summary);
            ClassicAssert.IsNotNull(summary.Payments);
            ClassicAssert.AreEqual(term * 12, summary.Payments.Count); // Including initial payment
        }
    }
}
