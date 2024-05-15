import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";

import { enumCurrentScreen } from "../../../../redux/reducers/screenParts/enumsScreen";
import ScreenNone from "./elements/screenNone";
import ScreenBlockActive from "./elements/screenBlockActive/screenBlockActive";
import ScreenStartupAnimation from "./elements/screenStartupAnimation";
import ScreenTurnOffAnimation from "./elements/screenTurnOffAnimation";
import ScreenMain from "./elements/screenMain";
import ScreenSettings from "./elements/screenSettings/screenSettings";
import ScreenSettingsBattery from "./elements/screenSettingsBattery/screenSettingsBattery";
import ScreenShop from "./elements/screenShop";
import ScreenClock from "./elements/screenClock";
import ScreenCalendar from "./elements/screenCalendar";
import ScreenSettingsApps from "./elements/screenSettingsApps";
import ScreenSettingsTheme from "./elements/screenSettingsTheme/screenSettingsTheme";
import ScreenSettingsSounds from "./elements/screenSettingsSounds";
import ScreenSettingsScreen from "./elements/screenSettingsScreen";

const StyledScreenBody = styled.div`
  height: 600px;
`;

export default function ScreenBody() {
  const { currentScreen } = useAppSelector((state) => state.screen.center);


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
      {currentScreen === enumCurrentScreen.screenSettingsTheme && (
        <ScreenSettingsTheme />
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
