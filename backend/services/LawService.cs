using System;
using System.IO;
using System.Text.Json;
using MyBackend.Models;

namespace MyBackend.Services
{
    public class LawService
    {
        private readonly string _lawsPath = Path.Combine("reporters_db", "data", "laws.json");
        private readonly string _reportersPath = Path.Combine("reporters_db", "data", "reporters_export.json");

        public Law[] GetLaws()
        {
            var lawsJson = File.ReadAllText(_lawsPath);
            var lawsDict = JsonSerializer.Deserialize<Dictionary<string, Law[]>>(lawsJson);
            var lawsList = lawsDict.SelectMany(kvp => kvp.Value).ToArray();
            return lawsList;
        }
        public ReportersDatabase GetReporters()
        {
            var reportersJson = File.ReadAllText(_reportersPath);
            return JsonSerializer.Deserialize<ReportersDatabase>(reportersJson);
        }

        public Law GetLaw(string citeType)
        {
            var laws = GetLaws();
            foreach (var law in laws)
            {
                if (law.CiteType == citeType)
                {
                    return law;
                }
            }

            return null;
        }

        public Reporter GetReporter(string name)
        {
            var reporters = GetReporters();
            foreach (var reporter in reporters)
            {
                foreach (var reporterName in reporter.Value)
                {
                    if (reporterName.Name == name)
                    {
                        return reporterName;
                    }
                }
            }

            return null;
        }

        public Edition GetEdition(string reporterName, string editionName)
        {
            var reporter = GetReporter(reporterName);
            if (reporter == null)
            {
                return null;
            }

            if (reporter.Editions == null)
            {
                return null;
            }

            if (reporter.Editions.TryGetValue(editionName, out var edition))
            {
                return edition;
            }

            return null;
        }

        public string GetReporterName(string name)
        {
            var reporter = GetReporter(name);
            return reporter?.Name;
        }

        public string GetReporterVariation(string name, string variation)
        {
            var reporter = GetReporter(name);
            if (reporter == null)
            {
                return null;
            }

            if (reporter.Variations == null)
            {
                return null;
            }

            if (reporter.Variations.TryGetValue(variation, out var reporterVariation))
            {
                return reporterVariation;
            }

            return null;
        }
    }
}