import React from "react";
import { CSSTransition } from "react-transition-group";
import { Route } from "react-router-dom";

import Encryption from "./Components/Encryption/encryption";
import Decryption from "./Components/Decryption/decryption";
import Landing from "./Components/Landing/landing";

function App() {
  const PAGES = [
    {
      path: "/",
      component: <Landing />,
      exact: true,
    },
    {
      path: "/encryption",
      component: <Encryption />,
      exact: false,
    },
    {
      path: "/decryption",
      component: <Decryption />,
      exact: false,
    },
  ];

  return (
    <React.Fragment>
      {PAGES.map(({ path, component, exact }) => (
        <Route key={path} path={path} exact={exact}>
          {({ match }) => (
            <CSSTransition
              in={match != null}
              timeout={3000}
              unmountOnExit
              appear
            >
              {component}
            </CSSTransition>
          )}
        </Route>
      ))}
    </React.Fragment>
  );
}

export default App;
