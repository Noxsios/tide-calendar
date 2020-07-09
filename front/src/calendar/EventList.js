import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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
    width: "100%",
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

async function deleteData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

const EventList = () => {
  const classes = useStyles();
  const [events, setEvents] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [update, setUpdate] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    fetch("http://localhost:9002/eventList/")
      .then((response) => response.json())
      .then((eventsList) => setEvents(eventsList));
  }, [update]);

  let removeEvent = (input) => {
    let obj_id = { id: input };
    setOpen(false);
    deleteData("http://localhost:9002/eventDelete/", obj_id).then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
    });
  };

  return (
    <React.Fragment>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Event List
      </Button>
      <Dialog
        open={open}
        scroll="paper"
        fullWidth
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Event List"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <table className={classes.table}>
              <tr>
                <th>Beach</th>
                <th>Title</th>
                <th>People</th>
                <th>Date</th>
                <th>Delete</th>
              </tr>
              {events.map((ele) => (
                <tr>
                  <td>
                    <small>{ele.beach.split("]")[1]}</small>
                  </td>
                  <td>
                    <small>{ele.title}</small>
                  </td>
                  <td>
                    <ul>
                      <small>
                        {ele.people.map((ele) => (
                          <li>{ele}</li>
                        ))}
                      </small>
                    </ul>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <small>{ele.date.slice(1, 11)}</small>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <small>
                      <Button
                        color="secondary"
                        onClick={() => {
                          removeEvent(ele._id);
                          setUpdate(!update);
                        }}
                      >
                        Remove
                      </Button>
                    </small>
                  </td>
                </tr>
              ))}
            </table>
          </DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default EventList;
