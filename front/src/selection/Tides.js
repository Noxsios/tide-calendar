import React from "react";
import GlobalContext from "../GlobalContext";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  table: {
    borderCollapse: "collapse",
    width: "80%",
    "& td": {
      border: "1px solid #ddd",
      "& ul": {
        listStyle: "none",
        margin: "0",
        paddingLeft: "5px",
      },
    },
  },
}));

const Tides = () => {
  const classes = useStyles();
  const { global, setGlobal } = React.useContext(GlobalContext);
  const [tideWeek, setTideWeek] = React.useState([]);

  React.useEffect(() => {
    if (global.beach !== "NONE") {
      let api_id = global.beach.split("]")[0].slice(1);
      let proxy = "https://cors-anywhere.herokuapp.com/";
      let url = `http://tidespy.com/api/tideturns?pn=${api_id}&unit=ft&start=20200705&days=7&key=Lb8hYM5V2lWd6IKnTwZoDtJyjkGXOFuR`;
      //   console.log(api_id)
      fetch(proxy + url)
        .then((response) => response.json())
        .then((week) => setTideWeek(week))
        .catch((error) => console.log(error));
    }
  }, [global.beach]);

  if (global.beach !== "NONE") {
    return (
        <table className={classes.table}>
          <tr>
            <th>Date</th>
            <th>Minute</th>
            <th>Height</th>
            <th>H or L</th>
          </tr>
          {tideWeek.Turns &&
            tideWeek.Turns.map((ele) => (
              <tr>
                <td>
                  <small>{ele.Date}</small>
                </td>
                <td>
                  <small>{ele.Minute}</small>
                </td>
                <td>
                  <small>{ele.Height}</small>
                </td>
                <td>
                  <small>{ele.HorL}</small>
                </td>
              </tr>
            ))}
        </table>
    );
  } else {
    return <React.Fragment></React.Fragment>;
  }
};

export default Tides;
