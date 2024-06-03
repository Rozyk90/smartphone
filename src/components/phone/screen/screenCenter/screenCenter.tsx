import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";

import { enumCurrentScreen } from "../../../../redux/reducers/screenParts/enumsScreen";
import ScreenNone from "./elements/screenNone";
import ScreenBlockActive from "./elements/screenBlockActive/screenBlockActive";
import ScreenStartupAnimation from "./elements/screenStartupAnimation";
import ScreenTurnOffAnimation from "./elements/screenTurnOffAnimation";
import ScreenMain from "./elements/screenMain";

import ScreenShop from "./elements/screenShop";
import ScreenClock from "./elements/screenClock";
import ScreenCalendar from "./elements/screenCalendar";
// ===============================================================================================
import SettingsMain from "./settings/settingsMain/settingsMain";
import SettingsBattery from "./settings/settingsBattery/settingsBattery";
import SettingsApps from "./settings/settingsApps";
import SettingsSounds from "./settings/settingsSound/settingsSounds";

import SettingsScreen from "./settings/settingsScreen/settingsScreen";

import SettingsTheme from "./settings/settingsTheme/settingsTheme";
import SettingsThemeBG from "./settings/settingsTheme/themeBackgrounds";
import SettingsThemeColors from "./settings/settingsTheme/themeColors";
import ScreenCountdown from "./settings/settingsScreen/screenCountdown";

const StyledScreenBody = styled.div`
  height: 600px;
`;

export default function ScreenCenter() {
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

      {/* =============================================================== */}


      {currentScreen === enumCurrentScreen.settingsMain && <SettingsMain />}
      {currentScreen === enumCurrentScreen.settingsBattery && (
        <SettingsBattery />
      )}
      {currentScreen === enumCurrentScreen.settingsApps && (
        <SettingsApps />
      )}

      {/* =============================================================== */}
      {currentScreen === enumCurrentScreen.settingsTheme && (
        <SettingsTheme />
      )}
      {currentScreen === enumCurrentScreen.settingsThemeBG && (
        <SettingsThemeBG />
      )}
      {currentScreen === enumCurrentScreen.settingsThemeColors && (
        <SettingsThemeColors />
      )}

      {/* =============================================================== */}

      {currentScreen === enumCurrentScreen.settingsSounds && (
        <SettingsSounds />
      )}

      {currentScreen === enumCurrentScreen.settingsScreen && (
        <SettingsScreen />
      )}
      {currentScreen === enumCurrentScreen.settingsScreenCountdown && (
        <ScreenCountdown />
      )}

      {currentScreen === enumCurrentScreen.screenShop && <ScreenShop />}
      {currentScreen === enumCurrentScreen.screenClock && <ScreenClock />}
      {currentScreen === enumCurrentScreen.screenCalendar && <ScreenCalendar />}
    </StyledScreenBody>
  );
}
