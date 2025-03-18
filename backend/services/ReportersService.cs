using System;
using System.IO;
using System.Text.Json;
using MyBackend.Models;

namespace MyBackend.Services
{
    public class ReportersService
    {
        public ReportersDatabase Reporters { get; private set; }

        public ReportersService()
        {
            try
            {
                // Ensure the folder name matches exactly ("data" vs. "Data")
                string filePath = Path.Combine(AppContext.BaseDirectory, "data", "reporters_export.json");
                var json = File.ReadAllText(filePath);
                
                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                };
                // Add the custom converter for DateTime?
                options.Converters.Add(new NullableDateTimeConverter());
                
                Reporters = JsonSerializer.Deserialize<ReportersDatabase>(json, options) ?? throw new InvalidOperationException("Deserialization returned null");
            }
            catch (Exception ex)
            {
                // Log the error so you can diagnose the issue
                Console.WriteLine($"Error reading or deserializing JSON file: {ex}");
                throw;
            }
        }
    }
}
