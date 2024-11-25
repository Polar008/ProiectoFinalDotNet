using System.ComponentModel.DataAnnotations;

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
	}
}
