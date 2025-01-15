using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MascotasAPI.Data;
using MascotasAPI.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace MascotasAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class MascotasController : ControllerBase
    {
        private readonly MascotasDbContext _context;

        public MascotasController(MascotasDbContext context)
        {
            _context = context;
        }

        // GET: api/Mascotas
        [HttpGet]
        public IActionResult GetMascotas()
        {
            var userId = GetUsuarioId();
            if (userId == null) return Unauthorized();

            var mascotas = _context.Mascotas
                .Where(m => m.UsuarioId == userId)
                .ToList();

            return Ok(mascotas);
        }

        // POST: api/Mascotas
        [HttpPost]
        public IActionResult PostMascota([FromBody] Mascota mascota)
        {
            var userId = GetUsuarioId();
            if (userId == null) return Unauthorized();

            // Asignar automáticamente el UsuarioId desde el token JWT
            mascota.UsuarioId = userId.Value;

            _context.Mascotas.Add(mascota);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetMascotas), new { id = mascota.Id }, mascota);
        }

        // Método auxiliar para obtener el UsuarioId del token JWT
        private int? GetUsuarioId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            return userIdClaim != null ? int.Parse(userIdClaim.Value) : null;
        }
    }
}
