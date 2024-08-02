import styled, { createGlobalStyle, ThemeProvider } from "styled-components";

import Components from "./components/components";
import GlobalEffects from "./globalEffects/globalEffects";

import useTheme from "./customHooks/useTheme";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const StyledApp = styled.div`
  font-family: "Roboto", sans-serif;
`;

function App() {
  const { getTheme } = useTheme();

  return (
    <StyledApp className="App">
      <GlobalStyle />
      <ThemeProvider theme={getTheme}>
        <Components />
        <GlobalEffects />
      </ThemeProvider>
    </StyledApp>
  );
}

export default App;
