import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { ReactComponent as Decrypt } from "../../Assets/Decrypt.svg";
import { ReactComponent as Encrypt } from "../../Assets/Encrypt.svg";

import SvgHalfPageButton from "../Basic/svgHalfPageButton";

const Container = styled.main`
  background-color: #2c2c2c;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 99;

  transition: transform var(--page-transition-duration) ease-in-out;

  &.enter {
    transform: translateY(100vh);
  }
  &.enter-active {
    transform: translateY(0);
  }
  &.exit {
    transform: translateY(0);
  }
  &.exit-active {
    transform: translateY(100vh);
  }
`;

function Landing({ shouldRender }) {
  const history = useHistory();

  return (
    <Container>
      <SvgHalfPageButton
        shouldRender={shouldRender}
        handler={() => history.push("/decryption")}
      >
        <Decrypt />
      </SvgHalfPageButton>
      <SvgHalfPageButton
        shouldRender={shouldRender}
        handler={() => history.push("/encryption")}
      >
        <Encrypt />
      </SvgHalfPageButton>
    </Container>
  );
}

export default Landing;
