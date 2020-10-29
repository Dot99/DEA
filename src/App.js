import React, { useContext } from "react";
import { CSSTransition } from "react-transition-group";
import { Route } from "react-router-dom";

import timingContext from "./Hooks/timingContext";

import Encryption from "./Components/Encryption/encryption";
import Decryption from "./Components/Decryption/decryption";
import Landing from "./Components/Landing/landing";

import "./reset.css";

function App() {
  const timings = useContext(timingContext);

  const PAGES = [
    {
      path: "/",
      Component: Landing,
      exact: true,
    },
    {
      path: "/encryption",
      Component: Encryption,
      exact: false,
    },
    {
      path: "/decryption",
      Component: Decryption,
      exact: false,
    },
  ];

  return (
    <React.Fragment>
      {PAGES.map(({ path, Component, exact }) => (
        <Route key={path} path={path} exact={exact}>
          {({ match }) => (
            <CSSTransition
              in={match != null}
              timeout={timings.page_transition_duration}
              unmountOnExit
              appear
            >
              <Component shouldRender={match != null} />
            </CSSTransition>
          )}
        </Route>
      ))}
    </React.Fragment>
  );
}

export default App;
