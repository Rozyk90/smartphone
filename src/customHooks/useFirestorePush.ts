import { useAppSelector } from "../redux/hooks";
import { db } from "../firebase";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";

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

  const { contactsList } = useAppSelector((state) => state.contacts.list);
  const { contactsHistory, contactsHistoryNotification } = useAppSelector(
    (state) => state.contacts.history
  );
  // =============================================================================================================================

  const updateFirestore = async (uid: string) => {
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
          contacts: {
            contactsList,
            contactsHistory: { contactsHistory, contactsHistoryNotification },
          },
        });
        console.log("Dokument zaktualizowany pomyślnie");
      } catch (error) {
        console.error("Błąd podczas aktualizacji dokumentu: ", error);
      }
    }
  };
  // =============================================================================================================================

  interface ContactHistoryObj {
    unixTime: number;
    whoCall: string;
    whoCallUid: string;
    toWho: string;
    toWhoUid: string | null;
  }

  const firestorePushCallObj = async (
    uid: string,
    callObj: ContactHistoryObj
  ) => {
    if (uid) {
      const userDocRef = doc(db, "users", uid);

      try {
        await updateDoc(userDocRef, {
          "contacts.contactsHistory.contactsHistory": arrayUnion(callObj),
          "contacts.contactsHistory.contactsHistoryNotification": true,
        });
      } catch (error) {
        console.error("Error :", error);
      }
    }
  };

  return {
    updateFirestore,
    firestorePushCallObj,
  };
};

export default useFirestorePush;
