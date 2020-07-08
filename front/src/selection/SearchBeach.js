import fetch from "cross-fetch";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import SelectDate from "./SelectDate";

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function SearchBeach() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const [beach, setBeach] = React.useState("");
  //   const [inputValue, setInputValue] = React.useState("");

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await fetch("http://localhost:9002/");
      const beaches = await response.json();
      await sleep(1500); // For demo purposes., swapped with above, seeing if that changes performance

      if (active) {
        setOptions(beaches.map((ele) => ele));
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <React.Fragment>
      <Autocomplete
        id="asynchronous-demo"
        style={{ width: 400 }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        getOptionSelected={(option, value) => option.title === value.title}
        getOptionLabel={(option) => `[${option.api_id}] ${option.title}`}
        options={options}
        loading={loading}
        onChange={(e) => setBeach(e.target.innerHTML)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search By Beach Name/Location"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
      <SelectDate beach={Number(beach.split("]")[0].slice(1))} />
    </React.Fragment>
  );
}
