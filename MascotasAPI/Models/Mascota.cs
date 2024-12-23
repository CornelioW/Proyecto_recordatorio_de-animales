namespace MascotasAPI.Models
{
    public class Mascota
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Tipo { get; set; } // "Perro" o "Gato"
        public DateTime FechaVacuna { get; set; }
        public DateTime HoraAlimentacion { get; set; }
        public int DiasLimpiezaArenero { get; set; } // Solo para gatos
    }
}
