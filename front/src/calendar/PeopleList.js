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

const PeopleList = () => {
  const classes = useStyles();
  const [people, setPeople] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [update, setUpdate] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    fetch("http://localhost:9002/personList/")
      .then((response) => response.json())
      .then((peopleList) => setPeople(peopleList));
  }, [update]);

  let removePerson = (input) => {
    let obj_id = { id: input };
    setOpen(false);
    deleteData("http://localhost:9002/personDelete/", obj_id).then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
    });
  };

  return (
    <React.Fragment>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        People List
      </Button>
      <Dialog
        open={open}
        scroll="paper"
        fullWidth
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"People List"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <table className={classes.table}>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Delete</th>
              </tr>
              {people.map((ele) => (
                <tr>
                  <td>
                    <small>{ele.first_name}</small>
                  </td>
                  <td>
                    <small>{ele.last_name}</small>
                  </td>
                  <td>
                    <small>{ele.email}</small>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <small>
                      <Button
                        color="secondary"
                        onClick={() => {
                          removePerson(ele._id);
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

export default PeopleList;
