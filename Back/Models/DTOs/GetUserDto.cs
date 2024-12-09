using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
	public class GetUserDto
	{
		public int Id { get; set; }
		public string Name { get; set; } = string.Empty;
		public string Email { get; set; } = string.Empty;
		//public string Password { get; set; } = string.Empty;
		public string? Photo { get; set; }
		public DateTime? DateOfBirth { get; set; }
		public bool IsEnterprise { get; set; }
		public bool IsCharity { get; set; }

		public int Points { get; set; }
	}
}