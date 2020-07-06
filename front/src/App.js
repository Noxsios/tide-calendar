import React from 'react';
import './App.css';
import 'fontsource-roboto';
import 'typeface-roboto-slab';
import { Typography, Divider, Paper, Container } from '@material-ui/core';
import ReadBeach from "./selection/ReadBeach"

function App() {
  return (
    <div>
      <Container maxWidth="md" className="mainContainer">
        <Paper elevation={5} className="mainPaper">
          <Typography variant="h6">
            Tide Calendar Full-stack App
          </Typography>
          <code>Made by Harry Randazzo (Razzle-Dazzle)</code>
          <Divider style={{margin:'1rem'}}/>
          <ReadBeach />
        </Paper>
      </Container>
    </div>
  );
}

export default App;
