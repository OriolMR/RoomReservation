using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using webapi.Areas.Identity.Data;
using webapi.DataAccess;
using Microsoft.AspNetCore.Identity.UI;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var authApplicationConnectionString = builder.Configuration.GetConnectionString("RoomReservationConnection") ?? throw new InvalidOperationException("Connection string 'AuthApplicationConnection' not found.");
builder.Services.AddDbContext<RoomReservationDbContext>(options =>
    options.UseSqlServer(authApplicationConnectionString));

var authApplicationContextConnectionString = builder.Configuration.GetConnectionString("IdentityConnection") ?? throw new InvalidOperationException("Connection string 'AuthApplicationContextConnection' not found.");
builder.Services.AddDbContext<IdentityAppDbContext>(options =>
    options.UseSqlServer(authApplicationContextConnectionString));

builder.Services.AddScoped<IRoomReservationDbContext, RoomReservationDbContext>();
builder.Services.AddScoped<IIdentityAppDbContext, IdentityAppDbContext>();
builder.Services.AddLogging();


builder.Services.AddIdentity<webapiUser, IdentityRole>(options =>
{
    options.SignIn.RequireConfirmedAccount = true;
    options.User.RequireUniqueEmail = true;
    options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
  
})
.AddEntityFrameworkStores<IdentityAppDbContext>()
.AddDefaultUI()
.AddDefaultTokenProviders();
  



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
