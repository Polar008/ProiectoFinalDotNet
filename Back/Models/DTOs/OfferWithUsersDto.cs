namespace Backend.Models
{
    public class OfferWithUsersDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string? ImgBanner { get; set; }
        public DateTime? DateBegin { get; set; }

        public DateTime? DateEnd { get; set; }
        public CharityDto Charity { get; set; } = null!;
        public int Capacity { get; set; }
        public ICollection<UserDto> Enrolleds { get; set; } = new List<UserDto>();
        public string Street { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;

        public ProvinceDto Province { get; set; } = null!;
    }
}