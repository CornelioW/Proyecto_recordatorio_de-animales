using Microsoft.AspNetCore.Mvc;
using MascotasAPI.Data;
using MascotasAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace MascotasAPI.Controllers
{
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
        public async Task<ActionResult<IEnumerable<Mascota>>> GetMascotas()
        {
            return await _context.Mascotas.ToListAsync();
        }

        // GET: api/Mascotas/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Mascota>> GetMascota(int id)
        {
            var mascota = await _context.Mascotas.FindAsync(id);

            if (mascota == null)
            {
                return NotFound();
            }

            return mascota;
        }

        // POST: api/Mascotas
        [HttpPost]
        public async Task<ActionResult<Mascota>> PostMascota(Mascota mascota)
        {
            _context.Mascotas.Add(mascota);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMascota), new { id = mascota.Id }, mascota);
        }

        // DELETE: api/Mascotas/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMascota(int id)
        {
            var mascota = await _context.Mascotas.FindAsync(id);

            if (mascota == null)
            {
                return NotFound();
            }

            _context.Mascotas.Remove(mascota);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
