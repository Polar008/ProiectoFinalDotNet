using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
	public class Charity
	{
		[Key]
		public int Id { get; set; }
	}
}
