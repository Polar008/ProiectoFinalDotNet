namespace Backend.Models
{
    public class AddPointsDto
    {
        public List<int> UserIds { get; set; }
        public int PointsToAdd { get; set; }
    }
}