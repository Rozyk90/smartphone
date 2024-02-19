import React from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "./redux/hooks";

import Components from "./components/components";
import Utilities from "./utilities/utilities";


const StyledApp = styled.div`
font-family: "Roboto", sans-serif;
`;


function App() {

  return (
    <StyledApp className="App">
      <Components />
      <Utilities />
    </StyledApp>
  );
}

export default App;



// do zrobienia przyciski przy wylaczaniu reset off 
// i sos moga dzialc lepiej bo teraz nie lapie tylko ramek ale tez ten napis 