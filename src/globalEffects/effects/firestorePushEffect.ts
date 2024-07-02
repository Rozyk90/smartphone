import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import useFirestorePush from "../../customHooks/useFirestorePush";

export default function FirestorePushEffect() {
  const [mounted, setMounted] = useState(false);
  const { uid } = useAppSelector((state) => state.user);
  const screenGrid = useAppSelector((state) => state.screen.center.screenGrid);
  const { countDownTimerSelected } = useAppSelector(
    (state) => state.screen.general
  );
  const {
    isShowingValue,
    isFastCharging,
    isBatteryProtection,
    isBatteryDescription,
  } = useAppSelector((state) => state.battery);

  const { darkMode, darkModeAuto, currentTheme, background } = useAppSelector(
    (state) => state.theme
  );

  const {
    callSoundID,
    notificationSoundID,
    callVibrationID,
    notificationVibrationID,
  } = useAppSelector((state) => state.sound.general);

  const { soundTouch, soundKeyboard, soundCharger, soundLockUnlockScreen } =
    useAppSelector((state) => state.sound.systemSounds);

  const {
    vibrationTouch,
    vibrationKeyboard,
    vibrationCharger,
    vibrationLockUnlockScreen,
  } = useAppSelector((state) => state.sound.systemVibration);

  const { contactsList } = useAppSelector((state) => state.contacts.list);
  const { contactsHistory,contactsHistoryNotification } = useAppSelector((state) => state.contacts.history);

  // ==========================================================================
  
  const { updateFirestore } = useFirestorePush();

  useEffect(() => {
    setMounted(true);
    if (mounted) {
      updateFirestore(uid);
    }
  }, [
    screenGrid,
    countDownTimerSelected,
    isShowingValue,
    isFastCharging,
    isBatteryProtection,
    isBatteryDescription,
    darkMode,
    darkModeAuto,
    currentTheme,
    background,
    callSoundID,
    notificationSoundID,
    callVibrationID,
    notificationVibrationID,
    soundTouch,
    soundKeyboard,
    soundCharger,
    soundLockUnlockScreen,
    vibrationTouch,
    vibrationKeyboard,
    vibrationCharger,
    vibrationLockUnlockScreen,
    contactsList,
    contactsHistory,
    contactsHistoryNotification
  ]);

  return null;
}
