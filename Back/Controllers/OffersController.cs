using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using NuGet.Protocol;

namespace Backend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class OffersController : ControllerBase
	{
		private readonly ApplicationDbContext _context;

		public OffersController(ApplicationDbContext context)
		{
			_context = context;
		}

		// GET: api/Offers
		[HttpGet]
		public async Task<IActionResult> GetOffers()
		{
			var offers = await _context.Offers
				.Include(o => o.Province)
				.Include(o => o.Charity)
				.Where(o => _context.UserOffers.Count(uo => uo.OfferId == o.Id) < o.Capacity)
				.Select(o => new OfferDto
				{
					Id = o.Id,
					Title = o.Title,
					Description = o.Description,
					ImgBanner = o.ImgBanner,
					Charity = new CharityDto
					{
						Id = o.Charity.Id,
						Name = o.Charity.Name,
					},
					Street = o.Street,
					City = o.City,
					Province = new ProvinceDto
					{
						Id = o.Province.Id,
						Code = o.Province.Code,
						Name = o.Province.Name
					}
				})
				.ToListAsync();

			return Ok(offers);
		}

		[HttpGet("search")]
		public async Task<IActionResult> GetSearchOffers()
		{
			var offers = await _context.Offers
				.Include(o => o.Province)
				.Include(o => o.Charity)
				.Where(o => _context.UserOffers.Count(uo => uo.OfferId == o.Id) < o.Capacity)
				.Select(o => new OfferListSearchDto
				{
					Id = o.Id,
					Title = o.Title,
				})
				.ToListAsync();

			return Ok(offers);
		}

		[HttpGet("c")]
		public async Task<IActionResult> GetOffers(string userPostalCode)
		{
			// Extraer los 2 primeros dígitos del código postal del usuario
			var userPostalPrefix = userPostalCode.Substring(0, 2);

			var offers = await _context.Offers
				.Include(o => o.Province)
				.Include(o => o.Charity)
				.Where(o => _context.UserOffers.Count(uo => uo.OfferId == o.Id) < o.Capacity) // Filtrar por capacidad
				.Select(o => new
				{
					Offer = o,
					PostalPrefix = o.Province.Code.Substring(0, 2) // Obtener los 2 primeros dígitos del código postal de la oferta
				})
				.OrderByDescending(o => o.PostalPrefix == userPostalPrefix) // Priorizar coincidencias en los 2 primeros dígitos
				.Take(20) // Limitar a 20 resultados
				.Select(o => new OfferDto
				{
					Id = o.Offer.Id,
					Title = o.Offer.Title,
					Description = o.Offer.Description,
					ImgBanner = o.Offer.ImgBanner,
					Charity = new CharityDto
					{
						Id = o.Offer.Charity.Id,
						Name = o.Offer.Charity.Name,
					},
					Street = o.Offer.Street,
					City = o.Offer.City,
					Province = new ProvinceDto
					{
						Id = o.Offer.Province.Id,
						Code = o.Offer.Province.Code,
						Name = o.Offer.Province.Name
					}
				})
				.ToListAsync();

			return Ok(offers);
		}

		[HttpGet("user/{userId}")]
		public async Task<IActionResult> GetOffersOfUser(int userId)
		{
			var of = await _context.Offers.Where(o => o.UserOffers.Any(uo => uo.UserId == userId)).ToListAsync();
			return Ok(of);
		}

		[HttpGet("count/{id}")]
		public async Task<ActionResult<OfferWithUsersDto>> GetCountUserOffer(int id)
		{
			var userCount = await _context.UserOffers.Where(uo => uo.OfferId == id).CountAsync();
			return Content(userCount.ToJson());
		}


		// GET: api/Offers/5
		[HttpGet("{id}")]
		public async Task<ActionResult<OfferWithUsersDto>> GetOffer(int id)
		{
			var offer = await _context.Offers
				.Include(o => o.Province)
				.Include(o => o.Charity)
				.Where(o => o.Id == id)
				.Select(o => new OfferWithUsersDto
				{
					Id = o.Id,
					Title = o.Title,
					Description = o.Description,
					ImgBanner = o.ImgBanner,
					Charity = new CharityDto
					{
						Id = o.Charity.Id,
						Name = o.Charity.Name,
					},
					Enrolleds = o.UserOffers.Select(uo => new UserDto
					{
						Id = uo.User.Id,
						Name = uo.User.Name
					}).ToList(),
					Capacity = o.Capacity,
					Street = o.Street,
					DateBegin = o.DateBegin,
					DateEnd = o.DateEnd,
					City = o.City,
					Province = new ProvinceDto
					{
						Id = o.Province.Id,
						Code = o.Province.Code,
						Name = o.Province.Name
					}
				})
				.FirstOrDefaultAsync();

			if (offer == null)
			{
				return NotFound(new { Message = $"Offer with ID not found: {id}" });
			}


			// var users = await _context.UserOffers
			// 	.Where(uo => uo.OfferId == id)
			// 	.Include(uo => uo.User)
			// 	.Select(uo => new UserDto
			// 	{
			// 		Id = uo.User.Id,
			// 		Name = uo.User.Name,
			// 	})
			// 	.ToListAsync();

			// offer.Enrolleds = users;

			return Ok(offer);
		}

		[HttpGet("charity")]
		public async Task<IActionResult> GetOffersByCharityId()
		{
			var userIdClaim = User?.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value;
			int userId = Int32.Parse(userIdClaim);

			var offers = await _context.Offers
				.Include(o => o.Province)
				.Include(o => o.Charity)
				.Where(o => o.CharityId == userId)
				.Select(o => new OfferWithUsersDto
				{
					Id = o.Id,
					Title = o.Title,
					Description = o.Description,
					ImgBanner = o.ImgBanner,
					Charity = new CharityDto
					{
						Id = o.Charity.Id,
						Name = o.Charity.Name,
					},
					Enrolleds = o.UserOffers.Select(uo => new UserDto
					{
						Id = uo.User.Id,
						Name = uo.User.Name
					}).ToList(),
					Capacity = o.Capacity,
					Street = o.Street,
					City = o.City,
					Province = new ProvinceDto
					{
						Id = o.Province.Id,
						Code = o.Province.Code,
						Name = o.Province.Name
					}
				})
				.ToListAsync();

			return Ok(offers);
		}


		// PUT: api/Offers/5
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPut("{id}")]
		public async Task<IActionResult> PutOffer(int id, Offer offer)
		{
			if (id != offer.Id)
			{
				return BadRequest();
			}

			_context.Entry(offer).State = EntityState.Modified;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!OfferExists(id))
				{
					return NotFound();
				}
				else
				{
					throw;
				}
			}

			return NoContent();
		}

		// POST: api/Offers
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPost]
		public async Task<ActionResult<Offer>> PostOffer([FromBody] CreateOfferDto createOfferDto)
		{
			if (!_context.Users.Any(u => u.Id == createOfferDto.CharityId))
			{
				return BadRequest(new { Message = "Invalid CharityId" });
			}

			if (!_context.Provinces.Any(p => p.Id == createOfferDto.ProvinceId))
			{
				return BadRequest(new { Message = "Invalid ProvinceId" });
			}

			var offer = new Offer
			{
				Title = createOfferDto.Title,
				Description = createOfferDto.Description,
				ImgBanner = createOfferDto.ImgBanner,
				Capacity = createOfferDto.Capacity,
				CharityId = createOfferDto.CharityId,
				ProvinceId = createOfferDto.ProvinceId,
				Street = createOfferDto.Street,
				DateBegin = createOfferDto.DateBegin,
				DateEnd = createOfferDto.DateEnd,
				City = createOfferDto.City
			};

			_context.Offers.Add(offer);
			await _context.SaveChangesAsync();

			return CreatedAtAction(nameof(GetOffer), new { id = offer.Id }, offer);
		}


		// DELETE: api/Offers/5
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteOffer(int id)
		{
			var userIdClaim = User?.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value;
			int userId = Int32.Parse(userIdClaim);

			var userExists = await _context.Users.AnyAsync(u => u.Id == userId);
			if (!userExists)
			{
				return BadRequest(new { Message = "The UserId does not exist." });
			}

			var isCharityClaim = User?.Claims.FirstOrDefault(c => c.Type == "IsCharity")?.Value;
			//return Content(isCharityClaim);
			bool isCharity = true;
			if (isCharityClaim == "False") isCharity = false;

			if (!isCharity)
			{
				return BadRequest(new { Message = "The IsCharity Error" });
			}


			var offer = await _context.Offers.FindAsync(id);
			if (offer == null)
			{
				return NotFound();
			}

			var query = $"DELETE FROM UserOffers WHERE OfferId = {id}";
			await _context.Database.ExecuteSqlRawAsync(query);

			_context.Offers.Remove(offer);
			await _context.SaveChangesAsync();

			return NoContent();
		}

		private bool OfferExists(int id)
		{
			return _context.Offers.Any(e => e.Id == id);
		}
	}
}
