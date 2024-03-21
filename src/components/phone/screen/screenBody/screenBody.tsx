import styled from "styled-components";
import { useAppSelector } from "../../../../redux/hooks";


import { enumCurrentScreen } from "../../../../redux/reducers/screenParts/enumsScreen";
import ScreenNone from "./elements/screenNone";
import ScreenBlockActive from "./elements/screenBlockActive/screenBlockActive";
import ScreenStartupAnimation from "./elements/screenStartupAnimation";
import ScreenTurnOffAnimation from "./elements/screenTurnOffAnimation";
import ScreenMain from "./elements/screenMain/screenMain";

const StyledScreenBody = styled.div`
  height: 600px;
`;

export default function ScreenBody() {
  const {currentScreen} = useAppSelector((state) => state.screen.center);

  return (
    <StyledScreenBody>
      {currentScreen === enumCurrentScreen.screenNone && <ScreenNone/>}
      {currentScreen === enumCurrentScreen.screenStartupAnimation && <ScreenStartupAnimation /> }
      {currentScreen === enumCurrentScreen.screenTurnOffAnimation && <ScreenTurnOffAnimation/>}
      {currentScreen === enumCurrentScreen.screenActiveBlocked && <ScreenBlockActive />}
      {currentScreen === enumCurrentScreen.screenMain && <ScreenMain />}
    </StyledScreenBody>
  );
}
