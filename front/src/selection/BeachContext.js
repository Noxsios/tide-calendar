import React, { useState } from "react";

const BeachContext = React.createContext([{}, () => {}]);

const BeachContextProvider = (props) => {
    const [state, setState] = useState({});
  return (
    <BeachContext.Provider value={[state, setState]}>
      {props.children}
    </BeachContext.Provider>
  );
};

export {BeachContext,BeachContextProvider};
