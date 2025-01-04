namespace MascotasAPI.Models
{
    public class Mascota
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public int? Edad { get; set; } // Edad opcional
        public string? Raza { get; set; } // Raza opcional
        public string Tipo { get; set; } = string.Empty; // Perro o Gato
    }
}
