import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import { ReactComponent as ArrowSVG } from "../../Assets/Arrow.svg";

import timingContext from "../../Hooks/timingContext";

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;

  z-index: 100;

  transition: transform var(--page-transition-duration) ease-in-out;

  padding: 20px 20px;

  background-color: #2c2c2c;
  color: white;

  border-radius: 100% 100% 0 0;

  transform: translate(-50%, 25%);

  a {
    color: white;
    text-decoration: none;
  }

  svg {
    width: 25px;
  }

  &.enter {
    transform: translate(-50%, -100vh);
  }
  &.enter-active {
    transform: translate(-50%, 25%);
  }
  &.exit {
    transform: translate(-50%, 25%);
  }
  &.exit-active {
    transform: translate(-50%, -100vh);
  }
`;

function LandingLink({ shouldRender }) {
  const timings = useContext(timingContext);
  return (
    <CSSTransition
      in={shouldRender}
      timeout={timings.page_transition_duration}
      unmountOnExit
      appear
    >
      <Container>
        <Link to="/">
          <ArrowSVG />
        </Link>
      </Container>
    </CSSTransition>
  );
}

export default LandingLink;
