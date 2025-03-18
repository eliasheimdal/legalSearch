using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace MyBackend.Models
{
    public class Reporter
    {
        [JsonPropertyName("cite_type")]
        public string? CiteType { get; set; }
        
        [JsonPropertyName("editions")]
        public Dictionary<string, Edition>? Editions { get; set; }
        
        [JsonPropertyName("mlz_jurisdiction")]
        public List<string>? MlzJurisdiction { get; set; }
        
        [JsonPropertyName("name")]
        public string? Name { get; set; }
        
        [JsonPropertyName("variations")]
        public Dictionary<string, string>? Variations { get; set; }
    }
}
