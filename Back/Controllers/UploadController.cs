using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UploadController : ControllerBase
    {
        private readonly string _uploadsFolder;

        public UploadController(IWebHostEnvironment env)
        {
            _uploadsFolder = Path.Combine(env.ContentRootPath, "uploads");
            if (!Directory.Exists(_uploadsFolder))
            {
                Directory.CreateDirectory(_uploadsFolder);
            }
        }

        [HttpPost()]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest(new { Message = "No file was uploaded." });
            }

            // Validar que sea una imagen
            var validImageTypes = new[] { "image/jpeg", "image/png", "image/gif" };
            if (!validImageTypes.Contains(file.ContentType))
            {
                return BadRequest(new { Message = "Invalid file type. Only JPG, PNG, and GIF are allowed." });
            }

            try
            {
                // Crear un nombre único para el archivo
                var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";

                // Ruta completa para guardar el archivo
                var filePath = Path.Combine(_uploadsFolder, fileName);

                // Guardar el archivo en el sistema de archivos
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                // Retornar la URL para acceder al archivo
                // var fileUrl = $"{Request.Scheme}://{Request.Host}/uploads/{fileName}";
                var fileUrl = $"uploads/{fileName}";
                return Ok(new { Message = "File uploaded successfully.", FileUrl = fileUrl });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while uploading the file.", Error = ex.Message });
            }
        }
    }

}