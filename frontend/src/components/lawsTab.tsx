import React, { useEffect, useState } from "react";
import { Laws } from "../interfaces/interfaces";

type LawsData = { [key: string]: Laws[] };

const LawsTab = () => {
    const [laws, setLaws] = useState<LawsData>({});
          useEffect(() => {
            fetch("https://localhost:5001/api/laws")
              .then((response) => response.json())
              .then((data) => setLaws(data))
              .catch((error) => console.error("Error fetching reporters:", error));
          }, []);
  return (
    <div>
      <h1>LawsTab</h1>
{Object.values(laws).flat().map((law) => (
  <div key={law.name}>
    <h2>{law.name}</h2>
    <p>{law.cite_type}</p>
    <p>{law.jurisdiction}</p>
    </div>
    ))}
    </div>
    

  )
}

export default LawsTab