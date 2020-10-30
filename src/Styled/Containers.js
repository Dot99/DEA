import styled from "styled-components";

const Container = styled.div`
  display: block;
`;

export const ViewportContainer = styled(Container)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
`;
