import React from "react";
import styled from "styled-components";

const Container = styled.button`
  width: 100%;
  height: 50vh;
`;

function SvgHalfPageButton({ children }) {
  return <Container>{children}</Container>;
}

export default SvgHalfPageButton;
