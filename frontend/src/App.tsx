import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Reporter } from "./interfaces/interfaces";

type ReportersData = { [key: string]: Reporter[] };

function App() {
  const [reporters, setReporters] = useState<ReportersData>({});
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    fetch("https://localhost:5001/api/reporters")
      .then((response) => response.json())
      .then((data) => setReporters(data))
      .catch((error) => console.error("Error fetching reporters:", error));
  }, []);

  // Handle changes in the filter input
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  };

  // Filter the reporters based on the reporter's name
  const filteredReporters: ReportersData = Object.entries(reporters).reduce(
    (acc, [key, reporterList]) => {
      const filteredList = reporterList.filter((reporter) =>
        reporter.name.toLowerCase().includes(filterText.toLowerCase())
      );
      if (filteredList.length > 0) {
        acc[key] = filteredList;
      }
      return acc;
    },
    {} as ReportersData
  );

  return (
    <div>
      <h1>Reporters</h1>
      <input
        type="text"
        placeholder="Filter by reporter name..."
        value={filterText}
        onChange={handleFilterChange}
      />
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
};

export default App;
