using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;

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
        public async Task<ActionResult<IEnumerable<ShopOffer>>> GetShopOffers()
        {
            var shopOffers = await (from s in _context.ShopOffers
                                    join r in _context.Rewards on s.Id equals r.ShopOfferId
                                    where r.UserId == -1
                                    select new
                                    {
                                        s.Id,
                                        s.Title,
                                        s.Description,
                                        s.Cost
                                    })
                            .Distinct() // Asegura que no se repitan
                            .ToListAsync();

            var result = shopOffers.Select(s => new ShopOffer
            {
                Id = s.Id,
                Title = s.Title,
                Description = s.Description,
                Cost = s.Cost
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
