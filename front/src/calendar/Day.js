import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import addMinutes from "date-fns/addMinutes";
import parseJSON from "date-fns/parseJSON";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import AddPerson from "./AddPerson";
import GlobalContext from "../GlobalContext";

async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

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
  formControl: {
    margin: theme.spacing(1),
    width: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  datestring: {
    color: theme.palette.primary,
  },
}));

let half_hour_array = [];

for (let i = 0; i <= 47; i++) {
  half_hour_array.push(i);
}

function getStyles(name, people, theme) {
  return {
    fontWeight:
      people.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Day = ({ date }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState(null);
  const [eventDate, setEventDate] = useState("");
  const [duration, setDuration] = useState(null);
  const [people, setPeople] = useState([]);
  const [apiDate, setApiDate] = useState("");
  const [names, setNames] = useState([]);

  const handleClickOpen = (e) => {
    setOpen(true);
    setEventDate(e.target.id);
    setApiDate(parseJSON(e.target.id));
    // (async () => {
    //   const response = await fetch("http://localhost:9002/personList/");
    //   const persons = await response.json();
    //   setNames(persons.map((ele) => `${ele.first_name} ${ele.last_name}`));
    // })();
  };

  const handleClose = () => {
    setOpen(false);
    setPeople([]);
    setDuration([]);
    setEventDate("");
    setTitle("");
  };

  const handleSubmit = () => {
    setOpen(false);
    let newEvent = {
      title: title,
      date: eventDate,
      people: people,
      beach: global.beach,
    }
    postData("http://localhost:9002/eventCreate/", newEvent).then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
    });
  };

  const handlePeopleChange = (e) => {
    setPeople(e.target.value);
  };

  const handlePeopleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setPeople(value);
  };

  const half_hour = (num) => {
    return JSON.stringify(
      addMinutes(date, 30 * num)
        .toLocaleTimeString()
        .replace(/:\d+ /, " ")
    )
      .replace('"', "")
      .replace('"', "");
  };

  const { global, setGlobal } = React.useContext(GlobalContext);

  return (
    <div>
      {half_hour_array.map((ele) => (
        <div
          className={classes.halfDiv}
          id={JSON.stringify(addMinutes(date, 30 * ele))}
          onClick={handleClickOpen}
        >
          {half_hour(ele)}
        </div>
      ))}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle
          id="form-dialog-title"
          style={{ margin: "0", padding: "0" }}
        >
          &nbsp;&nbsp;Event for&nbsp;
          <span className={classes.datestring}>
            {JSON.stringify(apiDate.toString()).slice(1, 16)}
          </span>{" "}
          at{" "}
          <span className={classes.datestring}>
            {JSON.stringify(apiDate.toString()).slice(17, 22)}
          </span>
          &nbsp;&nbsp;
        </DialogTitle>
        <DialogContent style={{ margin: "0", padding: "0" }}>
          <DialogContentText>
            <TextField
              margin="dense"
              id="dialog-title"
              label="Add title"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              style={{
                margin: "0",
                padding: "0",
                marginLeft: "10px",
                width: "70%",
                overflow: "hidden",
              }}
            />
            <hr />
            <FormControl
              className={classes.formControl}
              onClick={() =>
                (async () => {
                  const response = await fetch(
                    "http://localhost:9002/personList/"
                  );
                  const persons = await response.json();
                  setNames(
                    persons.map((ele) => `${ele.first_name} ${ele.last_name}`)
                  );
                })()
              }
            >
              <InputLabel id="demo-mutiple-chip-label">
                Select People to Invite
              </InputLabel>
              <Select
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                value={people}
                onChange={handlePeopleChange}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, people, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <AddPerson />
            <hr />
            &nbsp;For {global.beach}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Day;
