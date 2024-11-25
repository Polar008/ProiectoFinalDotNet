using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
	public class Reward
	{
		[Key]
		public int Id { get; set; }

		[Required]
		[ForeignKey("ShopOffer")]
		public int ShopOfferId { get; set; }

		// public ShopOffer ShopOffer { get; set; } = null!;

		[Required]
		[MaxLength(50)]
		public string ReedemableCode { get; set; } = string.Empty;

		public bool IsUsed { get; set; }
	}
}
