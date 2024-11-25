using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Offer
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(150)]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        public string? ImgBanner { get; set; }

        [Required]
        [ForeignKey("Charity")]
        public int CharityId { get; set; }

        public User Charity { get; set; } = null!;

        public int Capacity { get; set; }

        [Required]
        [ForeignKey("Province")]
        public int ProvinceId { get; set; }

        public Province Province { get; set; } = null!;

        [Required]
        [MaxLength(150)]
        public string Street { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string City { get; set; } = string.Empty;
    }
}
