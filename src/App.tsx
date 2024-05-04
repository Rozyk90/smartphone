import styled, { ThemeProvider } from "styled-components";

import Components from "./components/components";
import GroupedEffects from "./globalEffects";
import themeBase from "./themeBase";
import {enumTheme} from "./themeBase"
import { useAppSelector } from "./redux/hooks";



const StyledApp = styled.div`
  font-family: "Roboto", sans-serif;
`;



const Btn1 = styled.button`
  background: ${prop =>prop.theme.background};

`
const Btn2 = styled.button`
  background: ${prop =>prop.theme.background};


`



function App() {
  const currentTheme = useAppSelector((state) => state.theme.currentTheme)
  const darkMode = useAppSelector((state) => state.theme.darkMode)
  return (
    <StyledApp className="App">
      <ThemeProvider theme={themeBase[currentTheme][(darkMode?'dark':'light')]}>
        {currentTheme}
        <Btn1>Btn</Btn1>
        <Btn2>Btn</Btn2>
        <Components />
        <GroupedEffects />
      </ThemeProvider>
    </StyledApp>
  );
}

export default App;