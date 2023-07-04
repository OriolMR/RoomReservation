using Microsoft.EntityFrameworkCore;
using webapi.Areas.Identity.Data;
using webapi.DataAccess;


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

builder.Services.AddDefaultIdentity<webapiUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<IdentityAppDbContext>();

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
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
