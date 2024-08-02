import { useAppSelector } from "../redux/hooks";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

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
  const { smsHistory, smsNotification } = useAppSelector((state) => state.sms);
  const { alarms } = useAppSelector((state) => state.clock.alarm);

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
          sms: {
            smsHistory,
            smsNotification,
          },
          alarms,
        });
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
  // =============================================================================================================================

  type Message = {
    unixtime: number;
    unixtimeId: number;
    authorNumber: string;
    txt: string;
  };

  type Conversation = {
    elementId: number;
    smsToNumber: string;
    smsToUid: string | null;
    message: Message;
  };

  const firestorePushSendSmsTo = async (uid: string, smsObj: Conversation) => {
    if (uid) {
      const userDocRef = doc(db, "users", uid);
      const userDoc = await getDoc(userDocRef);
      const data = await userDoc.data();

      if (data) {
        const userSmsHistory = data.sms.smsHistory;
        const smsToUid = smsObj.smsToUid;
        const foundedConversation: boolean = userSmsHistory.some(
          (conv: { smsToUid: string }) => conv.smsToUid === smsToUid
        );

        if (foundedConversation) {
          const toUpdate = userSmsHistory.map((conv: any) => {
            if (conv.smsToUid === smsToUid) {
              return {
                ...conv,
                conversation: [...conv.conversation, smsObj.message],
              };
            } else {
              return conv;
            }
          });

          await updateDoc(userDocRef, {
            "sms.smsHistory": toUpdate,
            "sms.smsNotification": true,
          });
        } else {
          await updateDoc(userDocRef, {
            "sms.smsHistory": arrayUnion({
              elementId: smsObj.elementId,
              smsToNumber: smsObj.smsToNumber,
              smsToUid: smsObj.smsToUid,
              conversation: [smsObj.message],
            }),
            "sms.smsNotification": true,
          });
        }
      } else {
      }
    }
  };

  // =============================================================================================================================

  return {
    updateFirestore,
    firestorePushCallObj,
    firestorePushSendSmsTo,
  };
};

export default useFirestorePush;
