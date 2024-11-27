using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.Identity;



public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Configura CORS per permetre qualsevol origen, capçalera i mètode
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowAllOrigins", policy =>
            {
                policy.AllowAnyOrigin()
                      .AllowAnyHeader()
                      .AllowAnyMethod();
            });
        });


        // Configura la connexió a la base de dades
        builder.Services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

        // Configura l'autorització amb la política "AdminOnly"
        builder.Services.AddAuthorization(options =>
        {
            options.AddPolicy("AdminOnly", policy =>
                policy.RequireClaim("IsAdmin", "True"));
        });

        builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();

        builder.Services.AddControllers().AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
        });

        builder.Services.AddControllers().AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
            options.JsonSerializerOptions.DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull;
        });

        // builder.Services.AddControllers().AddNewtonsoftJson(options =>
        // {
        //     options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
        //     options.SerializerSettings.PreserveReferencesHandling = Newtonsoft.Json.PreserveReferencesHandling.None;
        // });


        builder.Services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = builder.Configuration["Jwt:Issuer"],
                ValidAudience = builder.Configuration["Jwt:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
            };
        });

        builder.Services.AddControllers();
        builder.Services.AddHttpClient();

        var app = builder.Build();

        // Reinicialitza la base de dades i afegeix usuaris i contactes de prova en desenvolupament
        if (app.Environment.IsDevelopment())
        {
            using (var scope = app.Services.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                var passwordHasher = scope.ServiceProvider.GetRequiredService<IPasswordHasher<User>>();

                // db.Database.EnsureDeleted();
                // db.Database.Migrate();

                if (!db.Users.Any(u => u.Email == "admin@gmail.com"))
                {
                    var adminUser = new User
                    {
                        Email = "admin@gmail.com",
                        Name = "Admin"
                    };
                    adminUser.Password = passwordHasher.HashPassword(adminUser, "1234");
                    db.Users.Add(adminUser);
                }


                if (!db.Users.Any(u => u.Email == "user1@gmail.com"))
                {
                    var user1 = new User
                    {
                        Email = "user1@gmail.com",
                        Name = "User1"
                    };
                    user1.Password = passwordHasher.HashPassword(user1, "1234");
                    db.Users.Add(user1);
                    db.SaveChanges();

                }

                if (!db.Provinces.Any(u => u.Name == "Lleida"))
                {
                    var province1 = new Province
                    {
                        Name = "Lleida",
                        Code = "25200"
                    };
                    db.Provinces.Add(province1);
                    db.SaveChanges();
                }

                if (!db.Provinces.Any(u => u.Name == "Madrid"))
                {
                    var province2 = new Province
                    {
                        Name = "Madrid",
                        Code = "10200"
                    };
                    db.Provinces.Add(province2);
                    db.SaveChanges();
                }


                if (!db.Offers.Any(u => u.Title == "Computación Gráfica"))
                {
                    var createOfferDto1 = new Offer
                    {
                        Title = "Computación Gráfica",
                        Description = "Test 1",
                        CharityId = 1,
                        ProvinceId = 1,
                        Capacity = 20,
                        Street = "Avinguda Test",
                        City = "Barcelona"
                    };
                    db.Offers.Add(createOfferDto1);
                    db.SaveChanges();
                }

                if (!db.Offers.Any(u => u.Title == ".NET"))
                {
                    var createOfferDto1 = new Offer
                    {
                        Title = ".NET",
                        Description = "Test 2",
                        CharityId = 1,
                        ProvinceId = 1,
                        Capacity = 10,
                        Street = "Avinguda Test",
                        City = "Barcelona"
                    };
                    db.Offers.Add(createOfferDto1);
                    db.SaveChanges();
                }

                 if (!db.Offers.Any(u => u.Title == "AI"))
                {
                    var createOfferDto1 = new Offer
                    {
                        Title = "AI",
                        Description = "Fine Tuning",
                        CharityId = 2,
                        ProvinceId = 2,
                        Capacity = 3,
                        Street = "Avinguda Test",
                        City = "Barcelona"
                    };
                    db.Offers.Add(createOfferDto1);
                    db.SaveChanges();
                }

                db.SaveChanges();
            }
        }



        app.UseCors("AllowAllOrigins");

        // app.UseStaticFiles(new StaticFileOptions
        // {
        //     FileProvider = new PhysicalFileProvider(
        //         Path.Combine(Directory.GetCurrentDirectory(), "uploads")),
        //     RequestPath = "/uploads"
        // });
        app.UseAuthentication();
        app.UseAuthorization();
        app.MapControllers();

        app.Run();
    }
}
