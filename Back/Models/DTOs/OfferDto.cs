namespace Backend.Models
{
    public class OfferDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string? ImgBanner { get; set; }
        public CharityDto Charity { get; set; } = null!;
        // public int Capacity { get; set; }
        public string Street { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;

        public ProvinceDto Province { get; set; } = null!;
    }
}