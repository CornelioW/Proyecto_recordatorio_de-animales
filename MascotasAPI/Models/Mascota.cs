namespace MascotasAPI.Models
{
    public class Mascota
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public int? Edad { get; set; } // Edad opcional
        public string? Raza { get; set; } // Raza opcional
        public string Tipo { get; set; } = string.Empty; // Perro o Gato

        // Relación con el Usuario
        public int UsuarioId { get; set; }
        public Usuario? Usuario { get; set; } // Relación opcional
    }
}
