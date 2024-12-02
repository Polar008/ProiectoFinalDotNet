namespace Backend.Models
{
    public class UpdateOfferDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string? ImgBanner { get; set; }
        public int CharityId { get; set; }
        public int ProvinceId { get; set; }
        public int Capacity { get; set; }
        public string Street { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
    }
}