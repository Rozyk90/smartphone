import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";

import { enumCurrentScreen } from "../../../../redux/reducers/screenParts/enumsScreen";
import ScreenNone from "./elements/screenNone";
import ScreenBlockActive from "./elements/screenBlockActive/screenBlockActive";
import ScreenStartupAnimation from "./elements/screenStartupAnimation";
import ScreenTurnOffAnimation from "./elements/screenTurnOffAnimation";
import ScreenMain from "./elements/screenMain/screenMain";
import ScreenSettings from "./elements/screenSettings/screenSettings";
import ScreenSettingsBattery from "./elements/screenSettingsBattery/screenSettingsBattery";
import ScreenShop from "./elements/screenShop";
import ScreenClock from "./elements/screenClock";
import ScreenCalendar from "./elements/screenCalendar";
import { useEffect } from "react";
import { resetScreenCountingDownShort } from "../../../../redux/reducers/screenParts/screenGeneral";
import ScreenSettingsApps from "./elements/screenSettingsApps";
import ScreenSettingsBackground from "./elements/screenSettingsBackground";
import ScreenSettingsSounds from "./elements/screenSettingsSounds";
import ScreenSettingsScreen from "./elements/screenSettingsScreen";

const StyledScreenBody = styled.div`
  height: 600px;
`;

export default function ScreenBody() {
  const { currentScreen } = useAppSelector((state) => state.screen.center);
  // const dispatch = useAppDispatch()

  // useEffect(() => {
  //   const resetTest = () => {
  //     if (
  //       currentScreen === enumCurrentScreen.screenNone ||
  //       currentScreen === enumCurrentScreen.screenStartupAnimation ||
  //       currentScreen === enumCurrentScreen.screenTurnOffAnimation
  //     ) {
  //       return false;
  //     }else{
  //       return true
  //     }
  //   };

  //   if(resetTest()){
  //     dispatch(resetScreenCountingDownShort())
  //   }

  // }, [currentScreen]);

  return (
    <StyledScreenBody>
      {currentScreen === enumCurrentScreen.screenNone && <ScreenNone />}
      {currentScreen === enumCurrentScreen.screenStartupAnimation && (
        <ScreenStartupAnimation />
      )}
      {currentScreen === enumCurrentScreen.screenTurnOffAnimation && (
        <ScreenTurnOffAnimation />
      )}
      {currentScreen === enumCurrentScreen.screenActiveBlocked && (
        <ScreenBlockActive />
      )}
      {currentScreen === enumCurrentScreen.screenMain && <ScreenMain />}
      {currentScreen === enumCurrentScreen.screenSettings && <ScreenSettings />}
      {currentScreen === enumCurrentScreen.screenSettingsBattery && (
        <ScreenSettingsBattery />
      )}
      {currentScreen === enumCurrentScreen.screenSettingsApps && (
        <ScreenSettingsApps />
      )}
      {currentScreen === enumCurrentScreen.screenSettingsBackground && (
        <ScreenSettingsBackground />
      )}
      {currentScreen === enumCurrentScreen.screenSettingsSounds && (
        <ScreenSettingsSounds />
      )}
      {currentScreen === enumCurrentScreen.screenSettingsScreen && (
        <ScreenSettingsScreen />
      )}

      {currentScreen === enumCurrentScreen.screenShop && <ScreenShop />}
      {currentScreen === enumCurrentScreen.screenClock && <ScreenClock />}
      {currentScreen === enumCurrentScreen.screenCalendar && <ScreenCalendar />}
    </StyledScreenBody>
  );
}
