import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { ViewportContainer } from "../../Styled/Containers";
import InputModal from "../InputModal/inputmodal";
import { H1 } from "../../Styled/titles";
import OutputModal, { createResult } from "../OutputModal/outputmodal";

const Container = styled.div`
  background-color: var(--dark-color);
  padding: 5vh 5vw;
  border-radius: 0 0 10px 10px;
`;

function Decryption({ shouldRender }) {
  const [result, setResult] = useState(null);

  function handleResult(e) {
    function handleEmpty() {
      console.log("Either blank or invalid type");
    }

    switch (e.content.type) {
      case String:
        if (e.content.content !== "") {
          //TODO: ENCRYPT STRING
          console.log("string"); //DELETABLE

          setResult(
            //Result goes here
            createResult(String, e.content.content)
          );
        } else {
          handleEmpty();
        }

        break;
      case File:
        //TODO: ENCRYPT FILE
        console.log("file"); //DELETABLE

        setResult(
          //Result goes here
          createResult(File, e.content.content)
        );
        break;

      default:
        handleEmpty();
    }
  }

  return (
    <ViewportContainer>
      <Container>
        <H1>Encrypt</H1>
        <InputModal buttontext="Encrypt" callback={handleResult} />
        <OutputModal result={result} close={() => setResult(null)} />
      </Container>
    </ViewportContainer>
  );
}

export default Decryption;
