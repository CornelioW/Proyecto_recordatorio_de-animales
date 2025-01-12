using System;
using Microsoft.Data.SqlClient;

class Program
{
    static void Main(string[] args)
    {
        var connectionString = "Server=localhost\\SQLEXPRESS;Database=MascotasDb;Trusted_Connection=True;TrustServerCertificate=True;";

        try
        {
            Console.WriteLine("Conectando a la base de datos...");
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();

                // Verifica si la conexión se abre correctamente
                Console.WriteLine("Conexión exitosa.");

                // Realiza una consulta simple para comprobar que la base de datos responde
                SqlCommand command = new SqlCommand("SELECT name FROM sys.databases", connection);
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    Console.WriteLine("Bases de datos disponibles:");
                    while (reader.Read())
                    {
                        Console.WriteLine($"- {reader.GetString(0)}");
                    }
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error al conectar a la base de datos:");
            Console.WriteLine(ex.Message);
        }
    }
}
