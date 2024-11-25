using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        // [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        // [Required]
        [MaxLength(100)]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        // [Required]
        // [MaxLength(255)]
        public string Password { get; set; } = string.Empty;

        public string? Photo { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public bool IsEnterprise { get; set; }

        public bool IsCharity { get; set; }

        public int Points { get; set; }

        // [Required]
        // [MaxLength(10)]
        public string PostalCode { get; set; } = string.Empty;
    }
}
