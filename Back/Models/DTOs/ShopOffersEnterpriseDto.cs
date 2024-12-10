namespace Backend.Models.DTOs
{
	public class ShopOffersEnterpriseDto
	{
		public int Id { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
		public decimal Cost { get; set; }
		public string ImgBanner { get; set; }
		public UserDto Charity { get; set; }

	}

}
