import { useAppSelector } from "../redux/hooks";
import { db } from "../firebase";
import { updateDoc, doc } from "firebase/firestore";

const useFirestorePush = () => {
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
  // =============================================================================================================================
  
  const firestorePush = async (uid:string) => {
    if (uid) {
      const userDocRef = doc(db, "users", uid);
      try {
        await updateDoc(userDocRef, {
          settings: {
            screen: {
              screenGrid,
              countDownTimerSelected,
            },
            battery: {
              isShowingValue,
              isFastCharging,
              isBatteryProtection,
              isBatteryDescription,
            },
            theme: {
              darkMode,
              darkModeAuto,
              currentTheme,
              background,
            },
            sound: {
              general: {
                callSoundID,
                notificationSoundID,
                callVibrationID,
                notificationVibrationID,
              },
              systemSounds: {
                soundTouch,
                soundKeyboard,
                soundCharger,
                soundLockUnlockScreen,
              },
              systemVibrations: {
                vibrationTouch,
                vibrationKeyboard,
                vibrationCharger,
                vibrationLockUnlockScreen,
              },
            },
          },
        });
        console.log("Dokument zaktualizowany pomyślnie");
      } catch (error) {
        console.error("Błąd podczas aktualizacji dokumentu: ", error);
      }
    }
  };

  return {
    firestorePush,
  };
};


export default useFirestorePush;
