import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";

import { enumCurrentScreen } from "../../../../redux/reducers/screenParts/enumsScreen";

import ScreenShop from "./elements/screenShop";
import ScreenClock from "./elements/screenClock";
import ScreenCalendar from "./elements/screenCalendar";
import Contacts from "./smsCall/contacts";
import NewContact from "./smsCall/screens/newContact";
import Calling from "./smsCall/screens/calling";
import Sms from "./smsCall/sms";
import Conversation from "./smsCall/screens/conversation";
import NewConversation from "./smsCall/screens/newConversation";

import ScreenNone from "./elements/screenNone";
import ScreenBlockActive from "./elements/screenBlockActive/screenBlockActive";
import ScreenStartupAnimation from "./elements/screenStartupAnimation";
import ScreenTurnOffAnimation from "./elements/screenTurnOffAnimation";
import ScreenMain from "./elements/screenMain";
// ===============================================================================================
import SettingsMain from "./settings/settingsMain/settingsMain";
import SettingsBattery from "./settings/settingsBattery/settingsBattery";
import SettingsApps from "./settings/settingsApps";
// ===============================================================================================
import SettingsSounds from "./settings/settingsSound/settingsSounds";
import SoundCall from "./settings/settingsSound/soundCall";
import SoundNotification from "./settings/settingsSound/soundNotification";
import SoundSystem from "./settings/settingsSound/soundSystem";
import SoundCallVibration from "./settings/settingsSound/soundCallVibration";
import SoundNotificationVibration from "./settings/settingsSound/soundNotificationVibration";
import SoundSystemVibration from "./settings/settingsSound/soundSystemVibration";
// ===============================================================================================
import SettingsScreen from "./settings/settingsScreen/settingsScreen";
import ScreenCountdown from "./settings/settingsScreen/screenCountdown";
// ===============================================================================================
import SettingsTheme from "./settings/settingsTheme/settingsTheme";
import SettingsThemeBG from "./settings/settingsTheme/themeBackgrounds";
import SettingsThemeColors from "./settings/settingsTheme/themeColors";


const StyledScreenBody = styled.div`
 height: 600px;
 overflow: hidden;
  
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
      {currentScreen === enumCurrentScreen.calling && <Calling/>}
      {currentScreen === enumCurrentScreen.sms && <Sms/>}
      {currentScreen === enumCurrentScreen.conversation && <Conversation/>}
      {currentScreen === enumCurrentScreen.newConversation && <NewConversation/>}

      {/* =============================================================== */}

      {currentScreen === enumCurrentScreen.settingsMain && <SettingsMain />}
      {currentScreen === enumCurrentScreen.settingsBattery && (
        <SettingsBattery />
      )}
      {currentScreen === enumCurrentScreen.settingsApps && <SettingsApps />}

      {/* =============================================================== */}
      {currentScreen === enumCurrentScreen.settingsTheme && <SettingsTheme />}
      {currentScreen === enumCurrentScreen.settingsThemeBG && (
        <SettingsThemeBG />
      )}
      {currentScreen === enumCurrentScreen.settingsThemeColors && (
        <SettingsThemeColors />
      )}

      {/* =============================================================== */}

      {currentScreen === enumCurrentScreen.settingsSounds && <SettingsSounds />}
      {currentScreen === enumCurrentScreen.settingsSoundsCall && <SoundCall />}
      {currentScreen === enumCurrentScreen.settingsSoundsNotification && (
        <SoundNotification />
      )}
      {currentScreen === enumCurrentScreen.settingsSoundsSystem && (
        <SoundSystem />
      )}
      {currentScreen === enumCurrentScreen.settingsSoundsCallVibration && (
        <SoundCallVibration />
      )}
      {currentScreen ===
        enumCurrentScreen.settingsSoundsNotificationsVibration && (
        <SoundNotificationVibration />
      )}
      {currentScreen === enumCurrentScreen.settingsSoundsSystemVibration && (
        <SoundSystemVibration />
      )}

      {/* =============================================================== */}
      {currentScreen === enumCurrentScreen.settingsScreen && <SettingsScreen />}
      {currentScreen === enumCurrentScreen.settingsScreenCountdown && (
        <ScreenCountdown />
      )}

      {currentScreen === enumCurrentScreen.screenShop && <ScreenShop />}
      {currentScreen === enumCurrentScreen.screenClock && <ScreenClock />}
      {currentScreen === enumCurrentScreen.screenCalendar && <ScreenCalendar />}
      {currentScreen === enumCurrentScreen.contacts && <Contacts />}
      {currentScreen === enumCurrentScreen.newContact && <NewContact />}
    </StyledScreenBody>
  );
}
