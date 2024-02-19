import styled from "styled-components";
import { useAppSelector } from "../../../../redux/hooks";


import { enumCurrentScreen } from "../../../../redux/reducers/screen";
import ScreenNone from "./elements/screenNone";
import ScreenBlockActive from "./elements/blockActive/screenBlockActive";
import ScreenStartupAnimation from "./elements/screenStartupAnimation";
import ScreenTurnOffAnimation from "./elements/screenTurnOffAnimation";
// import ScreenTurnOffBtns from "../modals/elements/modalTurnOffBtns/screenTurnOffBtns";

const StyledScreenBody = styled.div`
  height: 600px;
  /* border: 1px solid pink; */
`;



export default function ScreenBody() {
  const {currentScreen} = useAppSelector((state) => state.screen);

  return (
    <StyledScreenBody>
      {currentScreen === enumCurrentScreen.screenNone && <ScreenNone/>}
      {currentScreen === enumCurrentScreen.screenStartupAnimation && <ScreenStartupAnimation /> }
      {currentScreen === enumCurrentScreen.screenTurnOffAnimation && <ScreenTurnOffAnimation/>}
      {currentScreen === enumCurrentScreen.screenActiveBlocked && <ScreenBlockActive />}
    </StyledScreenBody>
  );
}
