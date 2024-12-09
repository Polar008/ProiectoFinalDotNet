using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using NuGet.Protocol;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace Backend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]

	[Authorize]
	public class RewardsController : ControllerBase
	{
		private readonly ApplicationDbContext _context;

		public RewardsController(ApplicationDbContext context)
		{
			_context = context;
		}

		// GET: api/Rewards
		[HttpGet]
		public async Task<ActionResult<IEnumerable<Reward>>> GetRewards()
		{
			return await _context.Rewards.ToListAsync();
		}

		// GET: api/Rewards/5
		[HttpGet("{id}")]
		public async Task<ActionResult<Reward>> GetReward(int id)
		{
			var reward = await _context.Rewards.FindAsync(id);

			if (reward == null)
			{
				return NotFound();
			}

			return reward;
		}

		// PUT: api/Rewards/5
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPut("{id}")]
		public async Task<IActionResult> PutReward(int id, Reward reward)
		{
			if (id != reward.Id)
			{
				return BadRequest();
			}

			_context.Entry(reward).State = EntityState.Modified;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!RewardExists(id))
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

		// POST: api/Rewards
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPost]
		public async Task<ActionResult<Reward>> PostReward(Reward reward)
		{
			_context.Rewards.Add(reward);
			await _context.SaveChangesAsync();

			return CreatedAtAction("GetReward", new { id = reward.Id }, reward);
		}

		[HttpGet("user")]
		public async Task<IActionResult> UserRewards()
		{
			var userIdClaim = User?.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value;
			int userId = Int32.Parse(userIdClaim);

			var reward = await _context.Rewards.Where(r => r.UserId == userId).ToListAsync();
			return Ok(reward);
		}

		//[HttpPut("use/{rewardId}")]
		//public async Task<IActionResult> UseReward(int rewardId)
		//{
		//    var reward = await _context.Rewards.FindAsync(rewardId);
		//    if (reward == null)
		//    {
		//        return NotFound(new { Message = $"Reward with ID {rewardId} not found." });
		//    }

		//    var userIdClaim = User?.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value;
		//    int userId = Int32.Parse(userIdClaim);

		//    var user = await _context.Users.AnyAsync(u => u.Id == userId);
		//    if (!user)
		//    {
		//        return BadRequest(new { Message = "The new user does not exist." });
		//    }

		//    reward.UserId = userId;
		//    _context.Entry(reward).Property(r => r.UserId).IsModified = true;
		//    await _context.SaveChangesAsync();

		//    return Ok(new { Message = "Reward updated successfully.", Reward = reward });
		//}

		[HttpPut("buy/{shopOfferId}")]
		public async Task<IActionResult> BuyReward(int shopOfferId)
		{
			var reward = await _context.Rewards
				.Where(r => r.ShopOfferId == shopOfferId && r.UserId == -1)
				.FirstOrDefaultAsync();

			if (reward == null)
			{
				return NotFound(new { Message = $"Reward with ShopOfferId {shopOfferId} not found." });
			}

			var userIdClaim = User?.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value;

			if (userIdClaim == null)
			{
				return BadRequest(new { Message = "User ID claim not found." });
			}

			if (!int.TryParse(userIdClaim, out int userId))
			{
				return BadRequest(new { Message = "Invalid User ID." });
			}

			
			var user = await _context.Users.FindAsync(userId);
			if (user == null)
			{
				return BadRequest(new { Message = "The user does not exist." });
			}

			var shopOffer = await _context.ShopOffers.FindAsync(shopOfferId);
			if (shopOffer == null)
			{
				return BadRequest(new { Message = "The shopOffer does not exist." });
			}

			if (user.Points < shopOffer.Cost)
			{
				return BadRequest(new { Message = "The user does not have enough points." });
			}

			user.Points -= shopOffer.Cost;
			_context.Users.Update(user);

			reward.UserId = userId;
			_context.Entry(reward).Property(r => r.UserId).IsModified = true;
			await _context.SaveChangesAsync();

			return Ok(new { Message = "Reward updated successfully.", Reward = reward });
		}



		[HttpPost("generates")]
		public async Task<ActionResult<Reward>> GenerateReward(UserShopOfferDto userShopOfferDto)
		{
			var userIdClaim = User?.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value;
			int userId = Int32.Parse(userIdClaim);

			var user = await _context.Users.FindAsync(userId);
			if (user == null)
			{
				return BadRequest(new { Message = "The user does not exist." });
			}

			var shopOffer = await _context.ShopOffers.FindAsync(userShopOfferDto.ShopOfferId);
			if (shopOffer == null)
			{
				return BadRequest(new { Message = "The shopOffer does not exist." });
			}

			user.Points -= shopOffer.Cost;
			_context.Users.Update(user);

			int count = userShopOfferDto.rewardsCount;
			for (int i = 0; i < count; i++)
			{
				Reward newReward = new Reward
				{
					ReedemableCode = Guid.NewGuid().ToString(),
					UserId = -1,
					ShopOfferId = shopOffer.Id
				};

				_context.Rewards.Add(newReward);
			}

			await _context.SaveChangesAsync();
			return NoContent();
		}


		//[HttpPost("buy")]
		//public async Task<ActionResult<Reward>> BuyReward(UserShopOfferDto userShopOfferDto)
		//{
		//	var userIdClaim = User?.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value;
		//	int userId = Int32.Parse(userIdClaim);

		//	var user = await _context.Users.FindAsync(userId);
		//	if (user == null)
		//	{
		//		return BadRequest(new { Message = "The user does not exist." });
		//	}

		//	var shopOffer = await _context.ShopOffers.FindAsync(userShopOfferDto.ShopOfferId);
		//	if (shopOffer == null)
		//	{
		//		return BadRequest(new { Message = "The shopOffer does not exist." });
		//	}

		//	if (user.Points < shopOffer.Cost)
		//	{
		//		return BadRequest(new { Message = "The user does not have enough points." });
		//	}

		//	user.Points -= shopOffer.Cost;
		//	_context.Users.Update(user);

		//	Reward newReward = new Reward
		//	{
		//		ReedemableCode = Guid.NewGuid().ToString(),
		//		UserId = -1,
		//		ShopOfferId = shopOffer.Id
		//	};

		//	_context.Rewards.Add(newReward);

		//	await _context.SaveChangesAsync();
		//	return NoContent();
		//}


		// [HttpPost("generate")]
		// public async Task<ActionResult<Reward>> GenerateReward(UserShopOfferDto userShopOfferDto)
		// {

		//     var userIdClaim = User?.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value;
		//     // var userIdClaim = User?.FindFirst(Claims.)?.Value;
		//     return Content(userIdClaim.ToJson());
		// }


		// DELETE: api/Rewards/5
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteReward(int id)
		{
			var reward = await _context.Rewards.FindAsync(id);
			if (reward == null)
			{
				return NotFound();
			}

			_context.Rewards.Remove(reward);
			await _context.SaveChangesAsync();

			return NoContent();
		}

		private bool RewardExists(int id)
		{
			return _context.Rewards.Any(e => e.Id == id);
		}
	}
}
