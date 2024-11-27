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
    public class UserOfferController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserOfferController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/UserOffer
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserOfferDto>>> GetUserOffers()
        {
            var userOffers = await _context.UserOffers
                .Include(uo => uo.User)
                .Include(uo => uo.Offer)
                .Select(uo => new UserOfferDto
                {
                    UserId = uo.UserId,
                    OfferId = uo.OfferId
                }).ToListAsync();

            return Ok(userOffers);
        }

        // GET: api/UserOffer/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserOffer>> GetUserOffer(int id)
        {
            var userOffer = await _context.UserOffers.FindAsync(id);

            if (userOffer == null)
            {
                return NotFound();
            }

            return userOffer;
        }

        // POST: api/UserOffer
        [HttpPost]
        public async Task<IActionResult> AddUserOffer(UserOfferDto userOfferDto)
        {
            var userExists = await _context.Users.AnyAsync(u => u.Id == userOfferDto.UserId);
            if (!userExists)
            {
                return BadRequest(new { Message = "The user does not exist." });
            }

            var offerExists = await _context.Offers.AnyAsync(o => o.Id == userOfferDto.OfferId);
            if (!offerExists)
            {
                return BadRequest(new { Message = "The offer does not exist." });
            }

            var userOffer = new UserOffer
            {
                UserId = userOfferDto.UserId,
                OfferId = userOfferDto.OfferId
            };

            _context.UserOffers.Add(userOffer);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Relationship added successfully." });
        }


        // DELETE: api/UserOffer/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUserOffer(int id)
        {
            var userOffer = await _context.UserOffers.FindAsync(id);
            if (userOffer == null)
            {
                return NotFound(new { Message = $"Enrollment with ID not found: {id}" });
            }

            _context.UserOffers.Remove(userOffer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/UserOffer/DeleteUser/5
        [HttpDelete("DeleteUser/{userId}")]
        public async Task<IActionResult> DeleteUser(int userId)
        {
            var userOffers = _context.UserOffers.Where(uo => uo.UserId == userId);
            _context.UserOffers.RemoveRange(userOffers);

            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/UserOffer/GetOffersByUser/5
        [HttpGet("GetOffersByUser/{userId}")]
        public async Task<ActionResult<IEnumerable<Offer>>> GetOffersByUser(int userId)
        {
            // Buscar las ofertas asociadas al usuario
            var userOffers = await _context.UserOffers
                .Where(uo => uo.UserId == userId)
                .Include(uo => uo.Offer)
                .Select(uo => uo.Offer)
                .ToListAsync();

            if (userOffers == null || !userOffers.Any())
            {
                return NotFound(new { Message = "No offers found for this user." });
            }

            return Ok(userOffers);
        }

        // GET: api/UserOffer/GetUsersByOffer/5
        [HttpGet("GetUsersByOffer/{offerId}")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsersByOffer(int offerId)
        {
            var userOffers = await _context.UserOffers
                .Where(uo => uo.OfferId == offerId)
                .Include(uo => uo.User)
                .Select(uo => uo.User)
                .ToListAsync();

            if (userOffers == null || !userOffers.Any())
            {
                return NotFound(new { Message = "No users found for this offer." });
            }

            return Ok(userOffers);
        }

        [HttpDelete("Unsubscribe/{userId}/{offerId}")]
        public async Task<IActionResult> Unsubscribe(int userId, int offerId)
        {
            var userOffer = await _context.UserOffers
                .FirstOrDefaultAsync(uo => uo.UserId == userId && uo.OfferId == offerId);

            if (userOffer == null)
            {
                return NotFound(new { Message = "No relationship found for the provided UserId and OfferId." });
            }

            _context.UserOffers.Remove(userOffer);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Unsubscribed successfully." });
        }


        private bool UserOfferExists(int id)
        {
            return _context.UserOffers.Any(e => e.UserId == id);
        }
    }
}
