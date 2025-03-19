import React, { useEffect, useState } from "react";
import "./App.css";
import { Reporter } from "./interfaces/interfaces";
import MultipleSelectChip from "./components/select";

type ReportersData = { [key: string]: Reporter[] };

function App() {
  const [reporters, setReporters] = useState<ReportersData>({});
  const [filterText, setFilterText] = useState("");
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string[]>([]);

  const receiveJurisdictionChange = (jurData : string[]) => {
    setSelectedJurisdiction(jurData);
  }

  useEffect(() => {
    fetch("https://localhost:5001/api/reporters")
      .then((response) => response.json())
      .then((data) => setReporters(data))
      .catch((error) => console.error("Error fetching reporters:", error));
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  };

  const filteredReporters: ReportersData = Object.entries(reporters).reduce(
    (acc, [key, reporterList]) => {
      const filteredName = reporterList.filter((reporter) =>
        reporter.name.toLowerCase().includes(filterText.toLowerCase())
      );
      const filteredList = selectedJurisdiction.length
        ? filteredName.filter((reporter) =>
            reporter.mlz_jurisdiction?.some((jurisdiction) =>
              selectedJurisdiction.includes(jurisdiction)
            )
          )
        : filteredName;
      if (filteredList.length > 0) {
        acc[key] = filteredList;
      }
      return acc;
    },
    {} as ReportersData
  );

  const jurisdictions: string[] = Object.values(reporters)
    .flat()
    .flatMap((reporter) => reporter.mlz_jurisdiction ?? [])
    .filter((value, index, self) => self.indexOf(value) === index);

  return (
    <div>
      <h1>Reporters</h1>
      <input
        type="text"
        placeholder="Filter by reporter name..."
        value={filterText}
        onChange={handleFilterChange}
      />
      <MultipleSelectChip data={jurisdictions} receiveJurisdictionChange={receiveJurisdictionChange}/>
      <div>
        {Object.entries(filteredReporters).map(([key, reporterList]) => (
          <div key={key}>
            <h2>{key}</h2>
            <ul>
              {reporterList.map((reporter, index) => (
                <li key={index}>
                  {reporter.name} - {reporter.cite_type}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
