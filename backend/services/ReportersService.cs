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
                string filePath = Path.Combine(AppContext.BaseDirectory, "reporters_db", "data", "reporters_export.json");
                var json = File.ReadAllText(filePath);
                
                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                };
                options.Converters.Add(new NullableDateTimeConverter());
                
                Reporters = JsonSerializer.Deserialize<ReportersDatabase>(json, options) ?? throw new InvalidOperationException("Deserialization returned null");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error reading or deserializing JSON file: {ex}");
                throw;
            }
        }
    }
}
