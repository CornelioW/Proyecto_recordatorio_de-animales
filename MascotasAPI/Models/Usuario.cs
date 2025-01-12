namespace MascotasAPI.Models
{
    public class Usuario
    {
        public int Id { get; set; }

        // Propiedades requeridas con inicialización predeterminada
        public string Nombre { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
    }
}
