using Microsoft.AspNetCore.Mvc;
using MascotasAPI.Data;
using MascotasAPI.Models;
using BCrypt.Net;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MascotasAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly MascotasDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(MascotasDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
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

            // Generar token JWT
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.Email)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = _configuration["Jwt:Issuer"], // Agregado
                Audience = _configuration["Jwt:Audience"] // Agregado
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new
            {
                message = "Inicio de sesión exitoso",
                token = tokenString
            });
        }

        // Obtener lista de usuarios
        [HttpGet("usuarios")]
        public IActionResult GetUsuarios()
        {
            var usuarios = _context.Usuarios.ToList();

            // Devuelve 204 si no hay usuarios registrados
            if (!usuarios.Any())
            {
                return NoContent();
            }

            // Devuelve 200 OK con la lista de usuarios
            return Ok(usuarios);
        }
    }
}
