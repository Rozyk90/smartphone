import styled from "styled-components";
import { useAppSelector } from "../../../../redux/hooks";

import { enumCurrentScreen } from "../../../../redux/reducers/screenParts/enumsScreen";

import ScreenShop from "./other/appShop/screenShop";
import Clock from "./other/clock/clock";
import ScreenCalendar from "./other/screenCalendar";
import Calculator from "./other/calculator";
import Contacts from "./smsCall/contacts";
import NewContact from "./smsCall/screens/newContact";
import Calling from "./smsCall/screens/calling";
import Sms from "./smsCall/sms";
import Conversation from "./smsCall/screens/conversation";
import NewConversation from "./smsCall/screens/newConversation";

import ScreenNone from "./other/screenNone";
import ScreenBlockActive from "./other/screenBlockActive/screenBlockActive";
import ScreenStartupAnimation from "./other/screenStartupAnimation";
import ScreenTurnOffAnimation from "./other/screenTurnOffAnimation";
import ScreenMain from "./other/screenMain";
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
import ShopCatList from "./other/appShop/shopCatList";
import GameMemory from "./games/memory/gameMemory";
import NewAlarm from "./other/clock/screens/newAlarm";

const StyledScreenBody = styled.div`
  height: 600px;
  max-height: 600px;
  overflow: hidden;
`;

export default function ScreenCenter() {
  const { currentScreen } = useAppSelector((state) => state.screen.center);

  return (
    <StyledScreenBody>
      {currentScreen === enumCurrentScreen.screenMain && <ScreenMain />}
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
      {/* =============================================================== */}
      {currentScreen === enumCurrentScreen.calling && <Calling />}
      {currentScreen === enumCurrentScreen.sms && <Sms />}
      {currentScreen === enumCurrentScreen.conversation && <Conversation />}
      {currentScreen === enumCurrentScreen.newConversation && (
        <NewConversation />
      )}
      {currentScreen === enumCurrentScreen.contacts && <Contacts />}
      {currentScreen === enumCurrentScreen.newContact && <NewContact />}

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
      {/* =============================================================== */}

      {currentScreen === enumCurrentScreen.screenShop && <ScreenShop />}
      {currentScreen === enumCurrentScreen.shopCatList && <ShopCatList />}

      {/* =============================================================== */}

      {currentScreen === enumCurrentScreen.clock && <Clock />}
      {currentScreen === enumCurrentScreen.newAlarm && <NewAlarm />}
      {currentScreen === enumCurrentScreen.calculator && <Calculator />}
      {currentScreen === enumCurrentScreen.screenCalendar && <ScreenCalendar />}
      {currentScreen === enumCurrentScreen.gameMemory && <GameMemory />}
    </StyledScreenBody>
  );
}
