import React from "react";
const GlobalContext = React.createContext({
  global: "",
  setGlobal: () => {},
});
export default GlobalContext;
