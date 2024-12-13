using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace Backend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]

	// [Authorize]
	public class UsersController : ControllerBase
	{
		private readonly ApplicationDbContext _context;
		private readonly IPasswordHasher<User> _passwordHasher;

		public UsersController(ApplicationDbContext context, IPasswordHasher<User> passwordHasher)
		{
			_context = context;
			_passwordHasher = passwordHasher;
		}

		// GET: api/Users
		[HttpGet]
		public async Task<ActionResult<IEnumerable<User>>> GetUsers()
		{
			return await _context.Users.ToListAsync();
		}

		// GET: api/Users/5
		[HttpGet("{id}")]
		[AllowAnonymous]
		public async Task<ActionResult<User>> GetUser(int id)
		{
			var user = await _context.Users.FindAsync(id);

			if (user == null)
			{
				return NotFound();
			}

			user.Password = null;

			return user;
		}


		// PUT: api/Users/5
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPut("{id}")]
		public async Task<IActionResult> PutUser(int id, User user)
		{
			if (id != user.Id)
			{
				return BadRequest();
			}

			// Obtener el usuario existente de la base de datos
			var existingUser = await _context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == id);
			if (existingUser == null)
			{
				return NotFound();
			}

			// Mantener la contraseña actual del usuario
			user.Password = existingUser.Password;

			// Actualizar solo los campos necesarios, excluyendo Password
			_context.Entry(user).State = EntityState.Modified;
			_context.Entry(user).Property(u => u.Password).IsModified = false;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!UserExists(id))
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

		// POST: api/Users
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		// [AllowAnonymous]
		[HttpPost]
		// [AllowAnonymous] // Per accedir sense token a la creació de l'usuari
		public async Task<IActionResult> Register(User user)
		{
			// Codificar la contrasenya
			user.Password = _passwordHasher.HashPassword(user, user.Password);

			_context.Users.Add(user);
			await _context.SaveChangesAsync();

			return CreatedAtAction(nameof(Register), new { id = user.Id }, user);
		}

		// DELETE: api/Users/5
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteUser(int id)
		{
			var user = await _context.Users.FindAsync(id);
			if (user == null)
			{
				return NotFound();
			}

			_context.Users.Remove(user);
			await _context.SaveChangesAsync();

			return NoContent();
		}

		/*
		    {
			  "userIds": [1, 2, 3, 4],
			  "pointsToAdd": 5
			}
		 */

		[HttpPost("addPoints")]
		public async Task<IActionResult> AddPoints([FromBody] AddPointsDto request)
		{
			var userIdsString = string.Join(",", request.UserIds);

			var query = $"UPDATE Users SET Points = Points + {request.PointsToAdd} WHERE Id IN ({userIdsString})";
			await _context.Database.ExecuteSqlRawAsync(query);

			return Ok("Points updated correctly.");
		}


		private bool UserExists(int id)
		{
			return _context.Users.Any(e => e.Id == id);
		}
	}
}
