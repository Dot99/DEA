import React, { useContext, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { CSSTransition } from "react-transition-group";

import timingContext from "../../Hooks/timingContext";
import userEvent from "@testing-library/user-event";

const shake = keyframes`
  0% {
    transform: translate(0,0);
  }
  25% {
    transform: translate(1%, 0);
  }
  50% {
    transform: translate(0, 0);
  }
  75% {
    transform: translate(-1%, 0);
  }
  100% {
    transform: translate(0, 0);
  }
`;

const Container = styled.button`
  width: 100%;
  height: 50vh;
  cursor: pointer;

  transition: transform calc(var(--transition-duration) / 2) ease-in-out;

  &:active {
    animation: ${shake} 400ms ease infinite;
  }

  svg,
  svg path {
    transition: all var(--transition-duration) ease-in-out,
      fill var(--transition-duration) ease-in-out var(--transition-duration);
  }

  svg path {
    stroke-width: 2px;
    stroke: white;
  }

  svg {
    max-width: 75vw;
  }

  &.enter,
  &.appear {
    svg path {
      fill: transparent;
      stroke-dasharray: 800;
      stroke-dashoffset: 800;
    }
  }
  &.enter-active,
  &.appear-active {
    svg path {
      fill: #fff;
      stroke-dasharray: 800;
      stroke-dashoffset: 0;
    }
  }

  &.appear-done,
  &.enter-done {
    svg path {
      fill: #fff;
      stroke-dasharray: 800;
      stroke-dashoffset: 0;
    }
  }

  //HOVER EFFECTS
  &:hover {
    svg {
      transform: scale(0.8);
    }
    svg path {
      fill: transparent;
    }
  }
  &.hover--start {
    svg {
      path {
        stroke-dashoffset: 0;
      }
    }
  }
  &.hover--forward {
    svg {
      path {
        stroke-dashoffset: 600;
      }
    }
  }
  &.hover--backward {
    svg {
      path {
        stroke-dashoffset: -400;
      }
    }
  }
`;

function SvgHalfPageButton({ shouldRender, children }) {
  const ANIMATION_CLASS_STAGES = [
    "hover--start",
    "hover--forward",
    "hover--start",
    "hover--backward",
  ];

  const containerRef = useRef(null);
  const animationCurrentIndex = useRef(null);

  useEffect(() => {
    //setup mouseneter eventlistener to start a clock that changes the classes
    containerRef.current.addEventListener("mouseenter", () => {
      //reset the animation index
      animationCurrentIndex.current = 0;

      let clock = setInterval(() => {
        //remove previous class
        containerRef.current.classList.remove(
          ANIMATION_CLASS_STAGES[animationCurrentIndex.current]
        );

        animationCurrentIndex.current++;

        //if the index exceeds the animation stages length reset it back to 0
        if (animationCurrentIndex.current === ANIMATION_CLASS_STAGES.length) {
          animationCurrentIndex.current = 0;
        }

        //add the new class to the component
        containerRef.current.classList.add(
          ANIMATION_CLASS_STAGES[animationCurrentIndex.current]
        );
      }, timings.transition_duration);

      //set up eventlistener that ends the animation on mouse leave
      containerRef.current.addEventListener("mouseleave", function mleave() {
        //remove this listener
        containerRef.current.removeEventListener("mouseleave", mleave);

        //remove previous class
        containerRef.current.classList.remove(
          ANIMATION_CLASS_STAGES[animationCurrentIndex.current]
        );

        //clear timer
        clearInterval(clock);
      });
    });
  });

  const timings = useContext(timingContext);
  return (
    <CSSTransition
      in={shouldRender}
      timeout={timings.transition_duration}
      appear
      unmountOnExit
    >
      <Container ref={containerRef}>{children}</Container>
    </CSSTransition>
  );
}

export default SvgHalfPageButton;
