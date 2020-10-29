import React from "react";
import styled from "styled-components";

import { ReactComponent as Decrypt } from "../../Assets/Decrypt.svg";
import { ReactComponent as Encrypt } from "../../Assets/Encrypt.svg";

import SvgHalfPageButton from "../Basic/svgHalfPageButton";

const Container = styled.main`
  background-color: #2c2c2c;
`;

function Landing({ shouldRender }) {
  return (
    <Container>
      <SvgHalfPageButton shouldRender={shouldRender}>
        <Decrypt />
      </SvgHalfPageButton>
      <SvgHalfPageButton shouldRender={shouldRender}>
        <Encrypt />
      </SvgHalfPageButton>
    </Container>
  );
}

export default Landing;
