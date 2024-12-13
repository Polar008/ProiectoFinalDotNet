using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

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
        public int Capacity { get; set; }

        [Required]
        [ForeignKey("Charity")]
        public int CharityId { get; set; }

        [JsonIgnore]
        public User? Charity { get; set; }

        [Required]
        [ForeignKey("Province")]
        public int ProvinceId { get; set; }

        [JsonIgnore]
        public Province? Province { get; set; }

        public DateTime? DateBegin { get; set; }

        public DateTime? DateEnd { get; set; }

        [Required]
        [MaxLength(150)]
        public string Street { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string City { get; set; } = string.Empty;

        [JsonIgnore]
        public ICollection<UserOffer> UserOffers { get; set; } = new List<UserOffer>();
    }


}
