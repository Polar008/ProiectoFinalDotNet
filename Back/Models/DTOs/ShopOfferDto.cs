namespace Backend.Models
{
	public class ShopOfferDto
	{
		public int Id { get; set; }
		public string Title { get; set; } = string.Empty;
		public int Cost { get; set; }
		public string Description { get; set; } = string.Empty;
		public string? ImgBanner { get; set; }
		public CharityDto Charity { get; set; } = null!;
		public ICollection<User> Enrolleds { get; set; } = new List<User>();
	}
}