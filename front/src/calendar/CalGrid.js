import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Day from "./Day";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  days: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    "&:hover": {
      cursor: "pointer",
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const CalGrid = () => {
  const classes = useStyles();

  const [shadowMon, setshadowMon] = React.useState(3);
  const [shadowTue, setshadowTue] = React.useState(3);
  const [shadowWed, setshadowWed] = React.useState(3);
  const [shadowThu, setshadowThu] = React.useState(3);
  const [shadowFri, setshadowFri] = React.useState(3);
  const [shadowSat, setshadowSat] = React.useState(3);
  const [shadowSun, setshadowSun] = React.useState(3);

  const [Day, setDay] = React.useState('______');

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs>
          <Paper
            onMouseEnter={() => {
              setshadowMon(15);
            }}
            onMouseLeave={() => {
              setshadowMon(3);
            }}
            elevation={shadowMon}
            className={classes.days}
            id="Monday-card"
            onClick={(e) => {
              setDay(e.target.id.split("-")[0]);
            }}
          >
            Mon
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper
            onMouseEnter={() => {
              setshadowTue(15);
            }}
            onMouseLeave={() => {
              setshadowTue(3);
            }}
            elevation={shadowTue}
            className={classes.days}
            id="Tuesday-card"
            onClick={(e) => {
              setDay(e.target.id.split("-")[0]);
            }}
          >
            Tues
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper
            onMouseEnter={() => {
              setshadowWed(15);
            }}
            onMouseLeave={() => {
              setshadowWed(3);
            }}
            elevation={shadowWed}
            className={classes.days}
            id="Wednesday-card"
            onClick={(e) => {
              setDay(e.target.id.split("-")[0]);
            }}
          >
            Wed
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper
            onMouseEnter={() => {
              setshadowThu(15);
            }}
            onMouseLeave={() => {
              setshadowThu(3);
            }}
            elevation={shadowThu}
            className={classes.days}
            id="Thursday-card"
            onClick={(e) => {
              setDay(e.target.id.split("-")[0]);
            }}
          >
            Thurs
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper
            onMouseEnter={() => {
              setshadowFri(15);
            }}
            onMouseLeave={() => {
              setshadowFri(3);
            }}
            elevation={shadowFri}
            className={classes.days}
            id="Friday-card"
            onClick={(e) => {
              setDay(e.target.id.split("-")[0]);
            }}
          >
            Fri
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper
            onMouseEnter={() => {
              setshadowSat(15);
            }}
            onMouseLeave={() => {
              setshadowSat(3);
            }}
            elevation={shadowSat}
            className={classes.days}
            id="Saturday-card"
            onClick={(e) => {
              setDay(e.target.id.split("-")[0]);
            }}
          >
            Sat
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper
            onMouseEnter={() => {
              setshadowSun(15);
            }}
            onMouseLeave={() => {
              setshadowSun(3);
            }}
            elevation={shadowSun}
            className={classes.days}
            id="Sunday-card"
            onClick={(e) => {
              setDay(e.target.id.split("-")[0]);
            }}
          >
            Sun
          </Paper>
        </Grid>
      </Grid>
      <Paper elevtion={10} className={classes.paper}>
        Date selected is {Day}
      </Paper>
      {/* <Grid container spacing={3}>
          <Grid item xs>
            <Paper className={classes.days}>xs</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.days}>xs=6</Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.days}>xs</Paper>
          </Grid>
        </Grid> */}
    </div>
  );
};

export default CalGrid;
