import { enumIcons } from "../components/icons/enumsIcon";

import { useAppDispatch } from "../redux/hooks";
import { batteryDefault } from "../redux/reducers/battery";
import { alarmDefault } from "../redux/reducers/clock/alarm";
import { stopwatchReset } from "../redux/reducers/clock/stopwatch";
import { timerReset } from "../redux/reducers/clock/timer";
import { contactGeneralDefault } from "../redux/reducers/contacts/contactsGeneral";
import { contactsHistoryDefault } from "../redux/reducers/contacts/contactsHistory";
import { contactsListDefault } from "../redux/reducers/contacts/contactsList";
import { pageFirstUpdateOn } from "../redux/reducers/pageStates";
import { updateScreenGrid } from "../redux/reducers/screenParts/screenCenter";
import { screenGeneralDefault } from "../redux/reducers/screenParts/screenGeneral";
import { smsDefault } from "../redux/reducers/sms";
import { soundGeneralDefault } from "../redux/reducers/sound/general";
import { systemSoundDefault } from "../redux/reducers/sound/systemSounds";
import { systemVibrationDefault } from "../redux/reducers/sound/systemVibrations";
import { themeDefault } from "../redux/reducers/theme";

const useDefaultSetup = () => {
  const dispatch = useAppDispatch();

  const basicScreenGrid = [
    enumIcons.clock,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.appShop,
    enumIcons.gameMemory,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.contacts,
    enumIcons.sms,
    enumIcons.settings,
    enumIcons.calculator,
  ];

  const setDefaultSetup = () => {
    dispatch(alarmDefault());
    dispatch(stopwatchReset());
    dispatch(timerReset());
    // =======================================
    dispatch(contactGeneralDefault());
    dispatch(contactsHistoryDefault());
    dispatch(contactsListDefault());
    // =======================================
    dispatch(screenGeneralDefault());
    dispatch(updateScreenGrid(basicScreenGrid));
    // =======================================
    dispatch(soundGeneralDefault());
    dispatch(systemVibrationDefault());
    dispatch(systemSoundDefault());
    // =======================================
    dispatch(batteryDefault());
    // =======================================
    dispatch(smsDefault());
    // =======================================
    dispatch(themeDefault());
    // =======================================
    dispatch(pageFirstUpdateOn())
  };

  return { setDefaultSetup };
};

export default useDefaultSetup;
