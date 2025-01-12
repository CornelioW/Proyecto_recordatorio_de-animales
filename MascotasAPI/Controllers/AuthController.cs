using Microsoft.AspNetCore.Mvc;
using MascotasAPI.Data;
using MascotasAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using BCrypt.Net;


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

        [HttpPost("register")]
        public async Task<IActionResult> Register(Usuario usuario)
        {
            if (await _context.Usuarios.AnyAsync(u => u.Email == usuario.Email))
                return BadRequest("El correo ya está registrado.");

            // Cifrar la contraseña
            usuario.PasswordHash = BCrypt.Net.BCrypt.HashPassword(usuario.PasswordHash);

            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            return Ok("Usuario registrado con éxito.");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(Usuario usuario)
        {
            var dbUsuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == usuario.Email);
            if (dbUsuario == null || !BCrypt.Net.BCrypt.Verify(usuario.PasswordHash, dbUsuario.PasswordHash))
                return Unauthorized("Credenciales inválidas.");

            var token = GenerateJwt(dbUsuario!);
            return Ok(new { token });
        }

        private string GenerateJwt(Usuario usuario)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Email, usuario.Email),
                new Claim(ClaimTypes.NameIdentifier, usuario.Id.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
