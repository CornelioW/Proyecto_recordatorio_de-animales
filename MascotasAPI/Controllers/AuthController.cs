using Microsoft.AspNetCore.Mvc;
using MascotasAPI.Data;
using MascotasAPI.Models;
using BCrypt.Net;

namespace MascotasAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly MascotasDbContext _context;

        public AuthController(MascotasDbContext context)
        {
            _context = context;
        }

        // Registro de usuario
        [HttpPost("register")]
        public IActionResult Register([FromBody] Usuario usuario)
        {
            // Verificar si el usuario ya existe
            if (_context.Usuarios.Any(u => u.Email == usuario.Email))
            {
                return BadRequest("El usuario ya existe.");
            }

            // Hash de la contraseña
            usuario.PasswordHash = BCrypt.Net.BCrypt.HashPassword(usuario.PasswordHash);

            // Guardar en la base de datos
            _context.Usuarios.Add(usuario);
            _context.SaveChanges();

            return Ok("Usuario registrado con éxito.");
        }

        // Inicio de sesión
        [HttpPost("login")]
        public IActionResult Login([FromBody] Usuario usuario)
        {
            var user = _context.Usuarios.FirstOrDefault(u => u.Email == usuario.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(usuario.PasswordHash, user.PasswordHash))
            {
                return Unauthorized("Credenciales inválidas.");
            }

            // Retornar éxito (puedes generar un JWT aquí)
            return Ok(new { message = "Inicio de sesión exitoso" });
        }
    }
}
