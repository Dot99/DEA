import React from "react";
import styled from "styled-components";

const C = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  padding: 30px 0 0 0;
  margin: 25px 0;
  border: solid 3px var(--text-color);
  background-color: var(--text-color);
  color: var(--dark-color);
  border-radius: 5px;
`;

const L = styled.label`
  position: absolute;
  top: 25px;
  left: 50%;
  transform: translate(-50%);
  font-size: 1.25rem;
  cursor: text;
  color: var(--dark-color);
`;

const I = styled.input`
  width: 100%;
  padding: 5px 10px;
  color: var(--dark-color);

  &.hasContent {
    & + label {
      transform: translate(-50%, -25px) scale(0.75);
      opacity: 0.75;
    }
  }

  &:focus {
    & + label {
      transform: translate(-50%, -25px);
    }
  }
`;

function Input({
  type,
  name = null,
  labelid = null,
  handler = () => {
    console.trace("No handler provided");
  },
  state,
  children,
}) {
  return (
    <C>
      <I
        type={type}
        value={state}
        id={labelid}
        name={name}
        onChange={(e) => handler(e.target.value)}
        className={state !== "" ? "hasContent" : null}
      />
      {labelid != null ? <L for={labelid}>{children}</L> : null}
    </C>
  );
}

export default Input;
