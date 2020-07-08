import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import addMinutes from "date-fns/addMinutes";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  halfDiv: {
    backgroundColor: "#cd4138",
    color: "#050101",
    height: "25px",
    marginTop: "5px",
    overflow: "hidden",
    paddding: "0",
    borderRadius: "5px",
    "&:hover": {
      color: "#f0c8c5",
      cursor: "pointer",
      backgroundColor: "#822721",
    },
  },
}));

let half_hour_array = [];

for (let i = 0; i <= 47; i++) {
  half_hour_array.push(i);
}

const Day = ({ date }) => {
  const classes = useStyles();

  return (
    <div>
      {half_hour_array.map((ele) => (
        <div
          className={classes.halfDiv}
          id={JSON.stringify(addMinutes(date, 30 * ele))}
        >
          {JSON.stringify(
            addMinutes(date, 30 * ele)
              .toLocaleTimeString()
              .replace(/:\d+ /, " ")
          )
            .replace('"', "")
            .replace('"', "")}
        </div>
      ))}
    </div>
  );
};

export default Day;
