import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CalDay from "./Day";
import Divider from "@material-ui/core/Divider";

import GlobalContext from "../GlobalContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  days: {
    padding: theme.spacing(1),
    textAlign: "center",
    width: "auto",
    color: theme.palette.text.secondary,
    transition: "transform 0.5s",
    height: "30rem",
    overflow: "hidden",
    "&:hover": {
      overflow: "scroll",
      overflowX: "hidden",
    },
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const CalGrid = ({ week, dates, beach }) => {
  const classes = useStyles();

  const [shadowMon, setshadowMon] = React.useState(3);
  const [shadowTue, setshadowTue] = React.useState(3);
  const [shadowWed, setshadowWed] = React.useState(3);
  const [shadowThu, setshadowThu] = React.useState(3);
  const [shadowFri, setshadowFri] = React.useState(3);
  const [shadowSat, setshadowSat] = React.useState(3);
  const [shadowSun, setshadowSun] = React.useState(3);

  const [selectTime, setselectTime] = React.useState("______");

  const [dayNum, setdayNum] = React.useState("");
  const [Dates, setDates] = React.useState("");

  React.useEffect(() => {
    setdayNum(week);
    setDates(dates);
  }, [week, dates]);

  const { global, setGlobal } = React.useContext(GlobalContext);

  return (
    <div className={classes.root}>
      <Divider style={{ margin: "1rem" }} />
      <Paper elevation={10} className={classes.paper}>
        Time selected is {selectTime}
        <br />
        Beach selected is {JSON.stringify(beach)}
        <br />
        {/* <button onClick={() => setGlobal({...global,changed:'hello'})}>CLICK ME!</button>
        Color from context is {JSON.stringify(global)} */}
      </Paper>
      <Divider style={{ margin: "1rem" }} />
      <Grid container spacing={1}>
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
              if (e.target.id.match('Z"$')) setselectTime(e.target.id);
              // setselectTime(e.target.id.split("-")[0]);
            }}
          >
            Sun
            <Divider />
            {dayNum[0]}
            <CalDay date={Dates[0]} />
          </Paper>
        </Grid>
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
              if (e.target.id.match('Z"$')) setselectTime(e.target.id);
            }}
          >
            Mon
            <Divider />
            {dayNum[1]}
            <CalDay date={Dates[1]} />
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
              if (e.target.id.match('Z"$')) setselectTime(e.target.id);
            }}
          >
            Tues
            <Divider />
            {dayNum[2]}
            <CalDay date={Dates[2]} />
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
              if (e.target.id.match('Z"$')) setselectTime(e.target.id);
            }}
          >
            Wed
            <Divider />
            {dayNum[3]}
            <CalDay date={Dates[3]} />
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
              if (e.target.id.match('Z"$')) setselectTime(e.target.id);
            }}
          >
            Thurs
            <Divider />
            {dayNum[4]}
            <CalDay date={Dates[4]} />
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
              if (e.target.id.match('Z"$')) setselectTime(e.target.id);
            }}
          >
            Fri
            <Divider />
            {dayNum[5]}
            <CalDay date={Dates[5]} />
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
              if (e.target.id.match('Z"$')) setselectTime(e.target.id);
            }}
          >
            Sat
            <Divider />
            {dayNum[6]}
            <CalDay date={Dates[6]} />
          </Paper>
        </Grid>
      </Grid>
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
