import React from 'react';
import './App.css';
import 'fontsource-roboto';
import 'typeface-roboto-slab';
import { Typography, Divider, Paper, Container } from '@material-ui/core';
import ReadBeach from "./selection/ReadBeach"
import CalGrid from './calendar/CalGrid';
import SelectDate from './selection/SelectDate'

function App() {
  return (
    <div>
      <Container maxWidth="lg" className="mainContainer">
        <Paper elevation={5} className="mainPaper">
          <Typography variant="h6">Tide Calendar Full-stack App</Typography>
          <code>Made by Harry Randazzo (Razzle-Dazzle)</code>
          <Divider style={{ margin: "1rem" }} />
          <ReadBeach />
          <Divider style={{ margin: "1rem" }} />
          <CalGrid />
          {/* <SelectDate /> */}
        </Paper>
      </Container>
    </div>
  );
}

export default App;
