using Microsoft.EntityFrameworkCore;
using MascotasAPI.Data; // Asegúrate de usar el espacio de nombres correcto

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Habilita los controladores
builder.Services.AddControllers(); // ¡Esto es crucial!
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Agregar el contexto de la base de datos
builder.Services.AddDbContext<MascotasDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Mapea los controladores
app.MapControllers(); // ¡Esto también es crucial!

app.Run();
