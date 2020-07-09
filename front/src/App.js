import React from "react";
import "./App.css";
import "fontsource-roboto";
import "typeface-roboto-slab";
import { Typography, Divider, Paper, Container, Grid } from "@material-ui/core";
import GlobalContext from "./GlobalContext";
import SearchBeach from "./selection/SearchBeach";
import EventList from "./calendar/EventList";
import PeopleList from "./calendar/PeopleList"
import Tides from "./selection/Tides"

function App() {
  const [global, setGlobal] = React.useState({
    default: "default",
    beach: "NONE",
  });
  const value = { global, setGlobal };
  return (
    <div>
      <GlobalContext.Provider value={value}>
        <Container maxWidth="xl" className="mainContainer">
          <Paper elevation={5} className="mainPaper">
            <Typography variant="h6">Tide Calendar Full-stack App</Typography>
            <code>Made by Harry Randazzo (Razzle-Dazzle)</code>
            <Divider style={{ margin: "1rem" }} />
            <Grid container justify="center">
              <SearchBeach />
            </Grid>
            <Divider style={{ margin: "1rem" }} />
            <Grid container justify="space-evenly">
              <EventList />
              <PeopleList />
            </Grid>
          </Paper>
        </Container>
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
