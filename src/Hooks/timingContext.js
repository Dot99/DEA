import { createContext } from "react";

const obj = {
  page_transition_duration: 3000,
  transition_duration: 1000,
};

const timingContext = createContext(obj);

export default timingContext;
