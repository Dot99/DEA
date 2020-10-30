import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { ReactComponent as Decrypt } from "../../Assets/Decrypt.svg";
import { ReactComponent as Encrypt } from "../../Assets/Encrypt.svg";

import SvgHalfPageButton from "../Basic/svgHalfPageButton";

const Container = styled.main`
  background-color: #2c2c2c;
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
