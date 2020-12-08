import React from "react";
import styled from "styled-components";

const C = styled.div`
  position: relative;
  margin: 50px 0;
  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;

    position: absolute;
    top: 0;
    left: 0;

    background: var(--text-color);
    opacity: 1;

    transition: inherit;
    border-radius: 10px;
  }

  &.hasContent {
    &::before {
      opacity: 1;
    }

    label {
      transform: translate(-50%, -50%) scale(0.75);
      top: -10%;
      opacity: 0.75;
      color: var(--text-color);
    }
  }
`;

const T = styled.textarea`
  resize: none;
  width: 100%;
  position: relative;
  padding: 10px;
  transition: all var(--transition-duration) var(--timing-function);
  border: solid 2px var(--text-color);
  border-radius: 10px;

  color: var(--dark-color);

  &:focus {
    border: solid 2px var(--dark-color-secundary);
    &::before {
      opacity: 1;
    }
    & + label {
      transform: translate(-50%, -50%);
      top: -10%;
      color: var(--text-color);
    }
  }
`;

const L = styled.label`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.25rem;
  width: 100%;
  text-align: center;
  color: var(--dark-color);
  transition: all var(--transition-duration) var(--timing-function);
  cursor: text;
`;

function TextField({
  name = null,
  labelid = null,
  handler = () => {
    console.trace("No handler provided");
  },
  state,
  children,
  rows = 2,
}) {
  return (
    <C className={state === "" ? null : "hasContent"}>
      <T
        name={name}
        id={labelid}
        onChange={(e) => handler(e.target.value)}
        rows={rows}
        value={state}
      ></T>
      {labelid != null ? <L for={labelid}>{children}</L> : null}
    </C>
  );
}

export default TextField;
