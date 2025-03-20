import React, { useEffect, useState } from "react";
import MultipleSelectChip from "./select";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Reporter } from "../interfaces/interfaces";

type ReportersData = { [key: string]: Reporter[] };

const ReportersTab = () => {
      const [reporters, setReporters] = useState<ReportersData>({});
      const [filterText, setFilterText] = useState("");
      const [selectedJurisdiction, setSelectedJurisdiction] = useState<string[]>(
        []
      );

      const receiveJurisdictionChange = (jurData: string[]) => {
        setSelectedJurisdiction(jurData);
      };
    
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
      <div className="filter">
      <Box>
      <TextField
        id="demo-helper-text-misaligned"
        label="Filter by name..."
        value={filterText}
        onChange={handleFilterChange}
      />
    </Box>
      <MultipleSelectChip
        data={jurisdictions}
        receiveChange={receiveJurisdictionChange}
        name="Jurisdictions"
      />
      </div>
      <div>
        {Object.entries(filteredReporters).map(([key, reporterList]) => (
          <div key={key}>
            <h2 className="h2">{key}</h2>
            <ul className="ul">
              {reporterList.map((reporter, index) => (
                <li  key={index}>
                  {reporter.name} - {reporter.cite_type}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      </div>
  )
}

export default ReportersTab