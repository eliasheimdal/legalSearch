import React, { useEffect, useState } from "react";
import { Laws } from "../interfaces/interfaces";
import MultipleSelectChip from "./select";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

const LawsTab = () => {
  const [laws, setLaws] = useState<Laws[]>([]);
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string[]>(
    []
  );

  const receiveJurisdictionChange = (jurData: string[]) => {
    setSelectedJurisdiction(jurData);
  };

  useEffect(() => {
    fetch("https://localhost:5001/api/laws")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setLaws(data);
        } else {
          console.error("Expected laws data to be an array:", data);
        }
      })
      .catch((error) => console.error("Error fetching laws:", error));
  }, []);

  const filteredLaws =
    selectedJurisdiction.length === 0
      ? laws
      : laws.filter((law) =>
          Array.isArray(law.jurisdiction)
            ? law.jurisdiction.some((jur) => selectedJurisdiction.includes(jur))
            : selectedJurisdiction.includes(law.jurisdiction)
        );

  const jurisdictions: string[] = laws
    .flatMap((law) =>
      Array.isArray(law.jurisdiction) ? law.jurisdiction : [law.jurisdiction]
    )
    .filter((value, index, self) => value && self.indexOf(value) === index);

  return (
    <div>
      <h1>Laws</h1>
      <div className="filter">
      <MultipleSelectChip
        data={jurisdictions}
        receiveChange={receiveJurisdictionChange}
        name="Jurisdictions"
      />
      </div>
      {filteredLaws.map((law, index) => (
        <div className="ul" key={`${law.name || "no-name"}-${index}`}>
          <h2>{law.name}</h2>
          <p className="p">
            Jurisdiction:{" "}
            {Array.isArray(law.jurisdiction)
              ? law.jurisdiction.join(", ")
              : law.jurisdiction}
          </p>
          <Box>
            <Link href={law.href} underline="hover">
              {law.href ? "See more" : null}
            </Link>
          </Box>
        </div>
      ))}
    </div>
  );
};

export default LawsTab;
