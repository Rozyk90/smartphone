import { useAppSelector } from "../redux/hooks";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const useCreateFirestore = () => {
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
  const { contactsHistory, contactsHistoryNotification } = useAppSelector(
    (state) => state.contacts.history
  );

  const createFirestore = async (
    uid: string,
    uEmail: string,
    phoneNumber: string
  ) => {
    if (uid && uEmail && phoneNumber) {
      const userDocRef = doc(db, "users", uid);
      setDoc(userDocRef, {
        user: {
          uid,
          uEmail,
          phoneNumber,
        },
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
        contacts: {
          contactsList,
          contactsHistory: { contactsHistory, contactsHistoryNotification },
        },
      });
      console.log("Stworzono firestore poprawnie");
    }
  };

  return { createFirestore };
};

export default useCreateFirestore;
