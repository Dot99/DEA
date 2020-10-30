import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";

import timingContext from "../../Hooks/timingContext";

function getRandom(min, max) {
  const RANGE = max - min;
  const RANDOM = Math.random();
  const RANGED_RANDOM = RANDOM * RANGE;

  return RANGED_RANDOM + min;
}

const Container = styled.button`
  width: 100%;
  height: 50vh;
  cursor: pointer;

  transition: transform calc(var(--transition-duration) / 2) ease-in-out;

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

  &.exit {
    svg path {
      stroke-dasharray: 800;
      stroke-dashoffset: 0;
      fill: transparent;
      transition: all var(--transition-duration) ease-in-out
          calc(var(--transition-duration) / 4),
        fill calc(var(--transition-duration) / 4) ease-in-out;
    }
  }
  &.exit-active,
  &.exit-done {
    svg path {
      stroke-dasharray: 800;
      stroke-dashoffset: -800;
      fill: transparent;
    }
  }

  //HOVER EFFECTS
  &.hover--start,
  &.hover--forward,
  &.hover--backward {
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
        stroke-dashoffset: ${getRandom(300, 600)};
      }
    }
  }
  &.hover--backward {
    svg {
      path {
        stroke-dashoffset: ${getRandom(-600, -300)};
      }
    }
  }

  //ACTIVE EFFECTS
  &:active {
    svg {
      transform: scale(0.9);
    }
  }
`;

function SvgHalfPageButton({ shouldRender, handler, children }) {
  const timings = useContext(timingContext);

  const containerRef = useRef(null);
  const animationCurrentIndex = useRef(null);

  //SETUP THE HOVER EVENT LISTENERS
  useEffect(() => {
    const ANIMATION_CLASS_STAGES = [
      "hover--start",
      "hover--forward",
      "hover--start",
      "hover--backward",
    ];

    const innerRef = containerRef.current;
    let clock;

    if (!shouldRender) {
      handlemouseleave();
      return;
    }

    function handlemouseleave() {
      //clear timer
      clearInterval(clock);

      //remove previous class
      innerRef.classList.remove(
        ANIMATION_CLASS_STAGES[animationCurrentIndex.current]
      );
    }

    function handlemousenter() {
      //reset the animation index
      animationCurrentIndex.current = 0;

      clock = setInterval(() => {
        //remove previous class
        innerRef.classList.remove(
          ANIMATION_CLASS_STAGES[animationCurrentIndex.current]
        );

        animationCurrentIndex.current++;

        //if the index exceeds the animation stages length reset it back to 0
        if (animationCurrentIndex.current === ANIMATION_CLASS_STAGES.length) {
          animationCurrentIndex.current = 0;
        }

        //add the new class to the component
        innerRef.classList.add(
          ANIMATION_CLASS_STAGES[animationCurrentIndex.current]
        );
      }, timings.transition_duration);
    }

    //setup mouseneter eventlistener to start a clock that changes the classes
    innerRef.addEventListener("mouseenter", handlemousenter);

    //setup mouseleave to end animations
    innerRef.addEventListener("mouseleave", handlemouseleave);

    //unMount functions
    return () => {
      clearInterval(clock);
      innerRef.removeEventListener("mouseenter", handlemousenter);
      innerRef.removeEventListener("mouseleave", handlemouseleave);
    };
  }, [timings.transition_duration, shouldRender]);

  //SETUP THE CLICK HANDLER
  useEffect(() => {
    const innerRef = containerRef.current;

    function handleclick() {
      handler();
    }

    innerRef.addEventListener("click", handleclick);

    return () => {
      innerRef.removeEventListener("click", handleclick);
    };
  }, [handler]);

  return (
    <CSSTransition
      in={shouldRender}
      timeout={timings.transition_duration}
      appear
    >
      <Container ref={containerRef}>{children}</Container>
    </CSSTransition>
  );
}

export default SvgHalfPageButton;
