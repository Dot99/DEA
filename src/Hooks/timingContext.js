import { createContext } from "react";

const obj = {
  page_transition_duration: 1250,
  transition_duration: 800,
};

const timingContext = createContext(obj);

export default timingContext;
