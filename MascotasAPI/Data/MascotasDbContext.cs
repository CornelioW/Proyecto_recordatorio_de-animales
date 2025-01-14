using Microsoft.EntityFrameworkCore;
using MascotasAPI.Models;

namespace MascotasAPI.Data
{
    public class MascotasDbContext : DbContext
    {
        public MascotasDbContext(DbContextOptions<MascotasDbContext> options) : base(options)
        {
        }

        public DbSet<Mascota> Mascotas { get; set; } = null!;
        public DbSet<Usuario> Usuarios { get; set; } = null!;
    }
}
