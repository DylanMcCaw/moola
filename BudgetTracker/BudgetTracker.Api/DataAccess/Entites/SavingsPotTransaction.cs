using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BudgetTracker.DataAccess.Entites
{
    public class SavingsPotTransaction
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [ForeignKey("SavingsPot")]
        public int SavingsPotId { get; set; }

        [Required]
        public DateTime TransactionDate { get; set; }

        [Required]
        [MaxLength(10)]
        public string TransactionType { get; set; } // "Deposit" or "Withdraw"

        [Required]
        public double Amount { get; set; }

        // Navigation property
        public virtual SavingsPot SavingsPot { get; set; }
    }
}
