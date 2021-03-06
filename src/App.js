import React, { useContext } from "react";
import { CSSTransition } from "react-transition-group";
import { Route, useLocation } from "react-router-dom";
import crypto from "crypto-js";

import timingContext from "./Hooks/timingContext";

import Encryption from "./Components/Encryption/encryption";
import Decryption from "./Components/Decryption/decryption";
import Landing from "./Components/Landing/landing";
import LandingLink from "./Components/LandingLink/landingLink";

import "./reset.css";

function App() {
  const timings = useContext(timingContext);
  const location = useLocation();

  /**
   * Encrypt example using cryptojs
   */
  (function name(params) {
    let key = "chave especial";
    let message = "hello world";

    let encr = crypto.AES.encrypt(message, key);

    console.log({
      key: key,
      message: encr.toString(),
    });

    let decr = crypto.AES.decrypt(encr, key).toString(crypto.enc.Utf8);

    console.log({ decr });
  })();

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
      <LandingLink shouldRender={location.pathname !== "/"} />
    </React.Fragment>
  );
}

export default App;
