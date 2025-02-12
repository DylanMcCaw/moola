﻿using System.ComponentModel.DataAnnotations;

namespace BudgetTracker.DataAccess.Entites
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string PasswordHash { get; set; }
    }
}
