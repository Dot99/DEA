import styled from "styled-components";

const Container = styled.div`
  display: block;
`;

export const ViewportContainer = styled(Container)`
  min-height: 100vh;
  &.enter,
  &.enter-active,
  &.exit,
  &.exit-active,
  &.appear,
  &.appear-active {
    display: absolute;
    top: 0;
    left: 0;
  }

  background: var(--dark-color-secundary);

  padding: 0 25vw;

  @media only screen and (max-width: 900px) {
    padding: 0 15vw;
  }

  @media only screen and (max-width: 600px) {
    padding: 0 5vw;
  }
`;
