using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Backend.Models.DTOs;

namespace Backend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class ShopOffersController : ControllerBase
	{
		private readonly ApplicationDbContext _context;

		public ShopOffersController(ApplicationDbContext context)
		{
			_context = context;
		}

		// GET: api/ShopOffers
		[HttpGet]
		public async Task<IActionResult> GetShopOffers()
		{
			// Obtener las ofertas relevantes con sus CharityId
			var shopOffers = await _context.ShopOffers
				.Where(s => _context.Rewards.Any(r => r.ShopOfferId == s.Id && r.UserId == -1))
				.Select(s => new
				{
					s.Id,
					s.Title,
					s.Description,
					s.Cost,
					s.ImgBanner,
					s.CharityId // Capturamos CharityId para usarlo después
				})
				.Distinct()
				.ToListAsync();

			// Extraer los CharityIds únicos
			var charityIds = shopOffers
				.Select(s => s.CharityId)
				.Distinct()
				.ToList();

			// Obtener las charities relacionadas con los CharityIds encontrados
			var charities = await _context.Users
				.Where(c => charityIds.Contains(c.Id))
				.ToDictionaryAsync(c => c.Id, c => new CharityDto
				{
					Id = c.Id,
					Name = c.Name
				});

			// Construir el resultado final
			var result = shopOffers.Select(s => new ShopOfferDto
			{
				Id = s.Id,
				Title = s.Title,
				Description = s.Description,
				Cost = s.Cost,
				ImgBanner = s.ImgBanner,
				Charity = charities.TryGetValue(s.CharityId, out var charity) ? charity : null
			}).ToList();

			return Ok(result);
		}

		[HttpGet("search")]
		public async Task<ActionResult<IEnumerable<ShopOfferListSearchDto>>> GetShopOfferSearch()
		{
			var shopOffers = await (from s in _context.ShopOffers
									join r in _context.Rewards on s.Id equals r.ShopOfferId
									where r.UserId == -1
									select new
									{
										s.Id,
										s.Title
									})
							.Distinct() // Asegura que no se repitan
							.ToListAsync();

			var result = shopOffers.Select(s => new ShopOfferListSearchDto
			{
				Id = s.Id,
				Title = s.Title
			}).ToList();

			return Ok(result);
		}

		[HttpGet("enterprise")]
		public async Task<IActionResult> GetEnterpriseShopOffers()
		{
			var userIdClaim = User?.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value;
			int userId = Int32.Parse(userIdClaim);

			var shopOffers = await _context.ShopOffers
				.Join(
					_context.Users,
					shopOffer => shopOffer.CharityId,
					user => user.Id,
					(shopOffer, user) => new { shopOffer, user }
				)
				.Where(x => x.user.IsEnterprise == true && x.user.Id == userId)
				.Select(x => new ShopOffersEnterpriseDto
				{
					Id = x.shopOffer.Id,
					Title = x.shopOffer.Title,
					Description = x.shopOffer.Description,
					Cost = x.shopOffer.Cost,
					ImgBanner = x.shopOffer.ImgBanner,
					Charity = new UserDto
					{
						Id = x.user.Id,
						Name = x.user.Name,
					}

				})
				.ToListAsync();

			return Ok(shopOffers);
		}



		// GET: api/ShopOffers/5
		[HttpGet("{id}")]
		public async Task<ActionResult<ShopOffer>> GetShopOffer(int id)
		{
			var shopOffer = await _context.ShopOffers.FindAsync(id);

			if (shopOffer == null)
			{
				return NotFound();
			}

			return shopOffer;
		}

		// PUT: api/ShopOffers/5
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPut("{id}")]
		public async Task<IActionResult> PutShopOffer(int id, ShopOffer shopOffer)
		{
			if (id != shopOffer.Id)
			{
				return BadRequest();
			}

			_context.Entry(shopOffer).State = EntityState.Modified;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!ShopOfferExists(id))
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

		// POST: api/ShopOffers
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPost]
		public async Task<ActionResult<ShopOffer>> PostShopOffer(ShopOffer shopOffer)
		{
			var userIdClaim = User?.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value;
			int userId = Int32.Parse(userIdClaim);

			shopOffer.CharityId = userId;

			_context.ShopOffers.Add(shopOffer);
			await _context.SaveChangesAsync();

			return CreatedAtAction("GetShopOffer", new { id = shopOffer.Id }, shopOffer);
		}

		// DELETE: api/ShopOffers/5
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteShopOffer(int id)
		{
			var shopOffer = await _context.ShopOffers.FindAsync(id);
			if (shopOffer == null)
			{
				return NotFound();
			}

			_context.ShopOffers.Remove(shopOffer);
			await _context.SaveChangesAsync();

			return NoContent();
		}

		private bool ShopOfferExists(int id)
		{
			return _context.ShopOffers.Any(e => e.Id == id);
		}
	}
}
