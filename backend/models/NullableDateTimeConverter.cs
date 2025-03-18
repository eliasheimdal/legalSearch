using System;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace MyBackend.Models
{
    public class NullableDateTimeConverter : JsonConverter<DateTime?>
    {
        public override DateTime? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            // If the token is null, return null.
            if (reader.TokenType == JsonTokenType.Null)
            {
                return null;
            }
            // If the token is a string, try to parse it.
            if (reader.TokenType == JsonTokenType.String)
            {
                var s = reader.GetString();
                if (DateTime.TryParse(s, out var dt))
                {
                    return dt;
                }
            }
            // If the token is not a string or parsing fails, skip the token and return null.
            reader.Skip();
            return null;
        }

        public override void Write(Utf8JsonWriter writer, DateTime? value, JsonSerializerOptions options)
        {
            if (value.HasValue)
            {
                writer.WriteStringValue(value.Value.ToString("o")); // ISO 8601 format
            }
            else
            {
                writer.WriteNullValue();
            }
        }
    }
}
