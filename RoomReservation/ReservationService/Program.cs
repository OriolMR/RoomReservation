
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using webapi.DataAccess;

var builder = WebApplication.CreateBuilder(args);

var locationServiceConnectionString = builder
                                          .Configuration
                                          .GetConnectionString("ReservationServiceConnection")
    ?? throw new InvalidOperationException("Connection string 'ReservationServiceConnection' not found.");

builder
    .Services
    .AddDbContext<ReservationsDbContext>(options => options
        .UseSqlServer(locationServiceConnectionString));

//using (var serviceProvider = builder.Services.BuildServiceProvider())
//{
//    var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
//    var adminRoleExists = roleManager.RoleExistsAsync("ADMINISTRADOR").Result;

//    if (!adminRoleExists)
//    {
//        var adminRole = new IdentityRole("ADMINISTRADOR");
//        roleManager.CreateAsync(adminRole).Wait();
//    }
//}

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost4200",
        builder =>
        {
            builder.WithOrigins("https://localhost:4200")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors("AllowLocalhost4200");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseHttpsRedirection();
    app.UseDefaultFiles();
    app.UseStaticFiles();
}

app.UseAuthorization();

app.MapControllers();

app.Run();


