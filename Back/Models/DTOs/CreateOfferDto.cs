using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class CreateOfferDto
    {
        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        public string? ImgBanner { get; set; }

        public DateTime? DateBegin { get; set; }

        public DateTime? DateEnd { get; set; }
        public int Capacity { get; set; }

        [Required]
        public int CharityId { get; set; }

        [Required]
        public int ProvinceId { get; set; }

        [Required]
        public string Street { get; set; } = string.Empty;

        [Required]
        public string City { get; set; } = string.Empty;
    }

}