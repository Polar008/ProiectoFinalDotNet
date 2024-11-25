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
            return await _context.ShopOffers.ToListAsync();
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
