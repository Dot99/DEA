import React from "react";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 10vh 10vw;
  &::before {
    transition: inherit;
    transition-delay: 0ms;
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: -1;

    background-color: var(--dark-color);
  }

  &.enter {
    &::before {
      opacity: 0;
    }

    .container {
      transform: translateY(-100vh);
    }
  }
  &.enter-active {
    &::before {
      opacity: 0.9;
    }
    .container {
      transform: translateY(0);
    }
  }
  &.exit {
    &::before {
      opacity: 0;
    }
    .container {
      transform: translateY(-100vh);
    }
  }
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  color: var(--text-color);
  background: var(--dark-color-secundary);
  border-radius: 20px;
  padding: 10px;
`;

const StringContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 10px 0;

  div {
    background-color: var(--dark-color);
    padding: 10px 20px;
    border-radius: 50px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  cursor: pointer;

  &::before,
  &::after {
    transition: inherit;
    content: "";
    display: block;
    width: 25px;
    height: 7px;
    background: var(--text-color);
    border-radius: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
  &::after {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  .flat {
    &::before,
    &::after {
      transform: translate(-50%, -50%);
    }
  }
`;

export const createResult = (type, result, key) => {
  return {
    type: type,
    result: result,
    key: key,
  };
};

function OutputModal({
  result = null,
  close = () => {
    console.trace("No modal closing callback provided!");
  },
}) {
  console.log(result);
  return (
    <CSSTransition in={result !== null} timeout={800} unmountOnExit>
      <Wrapper onClick={close}>
        <Container
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="container"
        >
          {result !== null ? (
            result.type === File ? (
              <FileOutput />
            ) : null
          ) : null}
          {result !== null ? (
            result.type === String ? (
              <StringOutput cipherkey={result.key}>
                {result.result}
              </StringOutput>
            ) : null
          ) : null}

          <CloseButton
            onClick={close}
            className={result === null ? "flat" : null}
          />
        </Container>
      </Wrapper>
    </CSSTransition>
  );
}

function FileOutput() {
  return <div>file</div>;
}

function StringOutput({ children, cipherkey }) {
  return (
    <StringContainer>
      <Field>
        <label>Key</label>
        <div>{cipherkey}</div>
      </Field>
      <Field>
        <label>String</label>
        <div>{children}</div>
      </Field>
    </StringContainer>
  );
}

export default OutputModal;
