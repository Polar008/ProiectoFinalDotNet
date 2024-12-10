using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Models
{
	public class ShopOffer
	{
		[Key]
		public int Id { get; set; }

		[Required]
		public int Cost { get; set; }

		[Required]
		[MaxLength(150)]
		public string Title { get; set; } = string.Empty;

		[Required]
		public string Description { get; set; } = string.Empty;

		public string? ImgBanner { get; set; }

		[Required]
		[ForeignKey("Charity")]
		public int CharityId { get; set; }

		[JsonIgnore]
		public ICollection<UserOffer> UserOffers { get; set; } = new List<UserOffer>();
	}
}
