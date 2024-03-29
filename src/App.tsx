import React from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "./redux/hooks";

import Components from "./components/components";
import GroupedEffects from "./globalEffects";


const StyledApp = styled.div`
font-family: "Roboto", sans-serif;
`;


function App() {

  return (
    <StyledApp className="App">
      <Components />
      <GroupedEffects />
    </StyledApp>
  );
}

export default App;



// do zrobienia przyciski przy wylaczaniu reset off 
// i sos moga dzialc lepiej bo teraz nie lapie tylko ramek ale tez ten napis 