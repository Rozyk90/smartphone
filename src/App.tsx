import styled, { ThemeProvider } from "styled-components";

import Components from "./components/components";
import GlobalEffects from "./globalEffects/globalEffects";

import useTheme from "./customHooks/useTheme";

const StyledApp = styled.div`
  font-family: "Roboto", sans-serif;
`;

function App() {
  const { getTheme } = useTheme();

  return (
    <StyledApp className="App">
      <ThemeProvider theme={getTheme}>
        <Components />
        <GlobalEffects />
      </ThemeProvider>
    </StyledApp>
  );
}

export default App;
