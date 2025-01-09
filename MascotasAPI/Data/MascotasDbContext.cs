using Microsoft.EntityFrameworkCore;
using MascotasAPI.Models;

namespace MascotasAPI.Data
{
    public class MascotasDbContext : DbContext
    {
        public MascotasDbContext(DbContextOptions<MascotasDbContext> options) : base(options)
        {
        }

        public DbSet<Mascota> Mascotas { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
    }
}
