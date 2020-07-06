import React from "react";

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
  return (
    <div>
      {typeof Data !== 'string' && JSON.stringify(Data)}
      <hr />
      <button onClick={submitRead}>CLICK ME!</button>
    </div>
  );
};

export default ReadBeach;
