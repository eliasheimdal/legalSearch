using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace MyBackend.Models
{
    public class Law
    {
        [JsonPropertyName("cite_type")]
        public string? CiteType { get; set; }

        [JsonPropertyName("end")]
        public string? End { get; set; }   
        
        [JsonPropertyName("examples")]
        public List<string>? Examples { get; set; }

        [JsonPropertyName("href")]
        public string? Href { get; set; }

        [JsonPropertyName("jurisdiction")]
        public string? Jurisdiction { get; set; }

        [JsonPropertyName("name")]
        public string? Name { get; set; }

        [JsonPropertyName("regexes")]
        public List<string>? Regexes { get; set; } 

        [JsonPropertyName("start")]
        public string? Start { get; set; }

        [JsonPropertyName("variations")]
        public List<string>? Variations { get; set; }
    }
}