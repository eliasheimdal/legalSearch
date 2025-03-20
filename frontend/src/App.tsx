import React, { useEffect, useState } from "react";
import "./App.css";
import ReportersTab from "./components/reportersTab";
import LawsTab from "./components/lawsTab";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    console.log(newValue);
  };

  return (
    <div className="App">
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Reporters" />
          <Tab label="Laws" />
          <Tab label="Item Three" />
        </Tabs>
      </Box>
      {value === 0 ? (
        <ReportersTab />
      ) : value === 1 ? (
        <LawsTab />
      ) : value === 2 ? (
        <div>
          <h1>Item Three</h1>
        </div>
      ) : null}
    </div>
  );
}

export default App;
