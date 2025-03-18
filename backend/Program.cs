using Microsoft.AspNetCore.Http;
using MyBackend.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddOpenApi();
builder.Services.AddControllers();

// Configure CORS to allow requests from your React frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactDev", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // React app URL
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Register your ReportersService so that it can be injected into controllers.
builder.Services.AddSingleton<ReportersService>();

builder.Services.AddHttpsRedirection(options =>
{
    options.RedirectStatusCode = StatusCodes.Status307TemporaryRedirect;
    options.HttpsPort = 5001;
});

var app = builder.Build();

// Set the URLs the application should listen to.
app.Urls.Add("http://localhost:5000");
app.Urls.Add("https://localhost:5001");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

// Use the defined CORS policy
app.UseCors("AllowReactDev");

// Map controller endpoints.
app.MapControllers();

app.Run();
