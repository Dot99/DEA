import React from "react";
import styled from "styled-components";

const B = styled.button`
  display: block;
  padding: 2vh 5vw;
  background: var(--dark-color-secundary);
  color: var(--text-color);
  border-radius: 10px;
  font-weight: 700;
  margin: 0 auto;
  cursor: pointer;
  width: 100%;

  &:hover {
    transform: scale(0.9);
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.8);
  }
`;

function Button({
  enabled = true,
  handler = () => {
    console.trace("No handler provided!");
  },
  children,
}) {
  return <B onClick={handler}>{children}</B>;
}

export default Button;
