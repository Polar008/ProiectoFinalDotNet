using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class OffersController : ControllerBase
	{
		private readonly ApplicationDbContext _context;

		public OffersController(ApplicationDbContext context)
		{
			_context = context;
		}

		// GET: api/Offers
		[HttpGet]
		public IActionResult GetOffers()
		{
			var offers = _context.Offers
				.Include(o => o.Province).Include(o => o.Charity)
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
					// Capacity = o.Capacity,
					Street = o.Street,
					City = o.City,
					Province = new ProvinceDto
					{
						Id = o.Province.Id,
						Code = o.Province.Code,
						Name = o.Province.Name
					}
				})
				.ToList();

			return Ok(offers);
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


			var users = await _context.UserOffers
				.Where(uo => uo.OfferId == id)
				.Include(uo => uo.User)
				.Select(uo => new UserDto
				{
					Id = uo.User.Id,
					Name = uo.User.Name,
				})
				.ToListAsync();

			offer.Enrolleds = users;

			return Ok(offer);
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
			var offer = await _context.Offers.FindAsync(id);
			if (offer == null)
			{
				return NotFound();
			}

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
