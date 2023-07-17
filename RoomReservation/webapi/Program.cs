using Microsoft.EntityFrameworkCore;
using webapi.Areas.Identity.Data;
using webapi.DataAccess;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var roomReservationConnectionString = builder.Configuration.GetConnectionString("RoomReservationConnection") ?? throw new InvalidOperationException("Connection string 'AuthApplicationConnection' not found.");
builder.Services.AddDbContext<RoomReservationDbContext>(options =>
    options.UseSqlServer(roomReservationConnectionString));

var roomReservationContextConnectionString = builder.Configuration.GetConnectionString("IdentityConnection") ?? throw new InvalidOperationException("Connection string 'AuthApplicationContextConnection' not found.");
builder.Services.AddDbContext<IdentityAppDbContext>(options =>
    options.UseSqlServer(roomReservationContextConnectionString));

builder.Services.AddDefaultIdentity<webapiUser>(options =>
{
    options.Password.RequireNonAlphanumeric = false;
    options.SignIn.RequireConfirmedAccount = false;
    options.Password.RequireUppercase = false;
    options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
})
   .AddEntityFrameworkStores<IdentityAppDbContext>();

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
