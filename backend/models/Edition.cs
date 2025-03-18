using System;
using System.Text.Json.Serialization;

namespace MyBackend.Models
{
    public class Edition
    {
        [JsonPropertyName("start")]
        public DateTime? Start { get; set; }
        
        [JsonPropertyName("end")]
        public DateTime? End { get; set; }
    }
}
