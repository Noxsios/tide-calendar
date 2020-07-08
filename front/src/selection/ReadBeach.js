import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const ReadBeach = () => {

  async function readData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      // body: JSON.stringify(data),
    });
    return response.json();
  }

  const [Data, setData] = React.useState("");

  let submitRead = () => {
    readData(`http://localhost:9002/`).then((data) => {
      //console.log(data); // JSON data parsed by `data.json()` call
      setData(data);
    });
  };

    React.useEffect(() => {
      submitRead()
    });

  return (
    <Autocomplete
      id="combo-box-beaches"
      options={Data}
      groupBy={(option) => option.title[0]}
      getOptionLabel={(option) => option.title}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search By Beach Name"
          variant="outlined"
        />
      )}
    />
  );
};

export default ReadBeach;
