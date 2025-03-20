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
      <header className="App-header">
        <h1>
          Data <br />
          Free Law Project
        </h1>
      </header>
      <Box className="App-box">
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
      <footer className="App-footer">
        <p>
          Copyright (c) 2014, Free Law Project <br />
          All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
