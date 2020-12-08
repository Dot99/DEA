import React, { useState } from "react";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";

import Input from "../Basic/input";
import Button from "../Basic/button";
import TextField from "../Basic/textarea";

const FS = styled.fieldset`
  position: relative;
  border: solid 2px var(--text-color);
  padding: 2vh 5vw;
  border-radius: 20px;
`;

const ModeContainer = styled.div`
  position: relative;
`;

const SubModeContainer = styled.div`
  padding: 20px 0;

  &.enter,
  &.enter-active {
    position: absolute;
    top: 0;
    width: 100%;
  }

  &.enter {
    transform: translateY(-100%);
    opacity: 0;
    transition-delay: 800ms;
  }
  &.enter-active {
    transform: translateY(0);
    opacity: 1;
  }

  &.exit-active {
    transform: translateY(100%);
    opacity: 0;
  }
`;

const ToggleContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  place-items: center;
`;

const Slider = styled.div`
  position: relative;
  width: 40px;
  height: 20px;
  background: var(--text-color);
  border-radius: 50px;
  cursor: pointer;

  margin: 30px 0;

  &:hover {
    transform: scale(1.2);

    &::before {
      transform: scale(0.8);
    }
  }

  &::before {
    transition: all var(--transition-duration) var(--timing-function);
    content: "";
    position: absolute;
    top: 1px;
    left: 1px;

    width: 18px;
    height: 18px;
    display: block;
    background: var(--dark-color);
    border-radius: 50px;
  }

  &.active {
    &::before {
      left: 21px;
    }
  }
`;

const MODES = [
  { Component: Str, name: "string" },
  { Component: FR, name: "file" },
];

function InputModal({
  callback = () => {
    console.trace("No callback provided");
  },
  buttontext = "Not defined",
}) {
  const [key, setKey] = useState("");
  const [content, setContent] = useState("");
  const [currentMode, setCurrentMode] = useState(MODES[0].name);

  function toggle() {
    if (currentMode === MODES[0].name) {
      setCurrentMode(MODES[1].name);
    } else {
      setCurrentMode(MODES[0].name);
    }

    setContent("");
  }

  return (
    <React.Fragment>
      <FS>
        <legend>Input</legend>
        <Input type="text" labelid="key" state={key} handler={setKey}>
          Key
        </Input>

        <Toggle callback={toggle} state={currentMode === MODES[0].name} />

        <ModeContainer>
          {MODES.map(({ name, Component }) => (
            <CSSTransition
              in={name === currentMode}
              timeout={800}
              unmountOnExit
              key={name}
            >
              <Component content={content} setContent={setContent} />
            </CSSTransition>
          ))}
        </ModeContainer>

        <Button handler={() => callback({ key: key, content: content })}>
          {buttontext}
        </Button>
      </FS>
    </React.Fragment>
  );
}

function FR({ content, setContent }) {
  const change = (e) => {
    let url = URL.createObjectURL(e.target.files[0]);
    setContent({ url: url, type: File });
  };

  return (
    <SubModeContainer>
      <input type="file" onChange={change} />
    </SubModeContainer>
  );
}

function Str({ content, setContent }) {
  const change = (e) => {
    setContent({ content: e, type: String });
  };

  return (
    <SubModeContainer>
      <TextField
        labelid="string"
        state={content.content}
        handler={change}
        rows={5}
      >
        String
      </TextField>
    </SubModeContainer>
  );
}

function Toggle({
  callback = () => {
    console.trace("No callback found");
  },
  state,
}) {
  return (
    <ToggleContainer>
      <span>File</span>
      <Slider className={state ? "active" : null} onClick={callback} />
      <span>String</span>
    </ToggleContainer>
  );
}

export default InputModal;
