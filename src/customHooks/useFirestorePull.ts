import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { batteryFirestoreUpdate } from "../redux/reducers/battery";
import { themeFirestoreUpdate } from "../redux/reducers/theme";
import { soundGeneralFirestoreUpdate } from "../redux/reducers/sound/general";
import { systemSoundsFirestoreUpdate } from "../redux/reducers/sound/systemSounds";
import { systemVibrationsFirestoreUpdate } from "../redux/reducers/sound/systemVibrations";
import { countDownSetTimer } from "../redux/reducers/screenParts/screenGeneral";
import { updateScreenGrid } from "../redux/reducers/screenParts/screenCenter";
import { contactsListCreate } from "../redux/reducers/contacts/contactsList";
import {
  contactsHistoryCreate,
  contactsHistoryNotificationSet,
} from "../redux/reducers/contacts/contactsHistory";
import { userSetNumber } from "../redux/reducers/user";
import { smsCreateHistory, smsSetNotification } from "../redux/reducers/sms";
import { alarmCreateList } from "../redux/reducers/clock/alarm";

const useFirestorePull = () => {
  const { smsHistory } = useAppSelector((state) => state.sms);
  const { contactsHistory } = useAppSelector((state) => state.contacts.history);

  const dispatch = useAppDispatch();

  // =======================================================================================

  const deepEqual = (obj1: any, obj2: any): boolean => {
    if (obj1 === obj2) return true;

    if (
      typeof obj1 !== "object" ||
      obj1 === null ||
      typeof obj2 !== "object" ||
      obj2 === null
    ) {
      return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
      if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
        return false;
      }
    }

    return true;
  };

  const firestorePullLarge = async (data: any) => {
    try {
      if (data) {
        dispatch(batteryFirestoreUpdate(data.settings.battery));
        dispatch(themeFirestoreUpdate(data.settings.theme));
        dispatch(soundGeneralFirestoreUpdate(data.settings.sound.general));
        dispatch(systemSoundsFirestoreUpdate(data.settings.sound.systemSounds));
        dispatch(
          systemVibrationsFirestoreUpdate(data.settings.sound.systemVibrations)
        );
        dispatch(
          countDownSetTimer(data.settings.screen.countDownTimerSelected)
        );
        dispatch(updateScreenGrid(data.settings.screen.screenGrid));
        dispatch(userSetNumber(data.user.phoneNumber));
        dispatch(contactsListCreate(data.contacts.contactsList));
        dispatch(
          contactsHistoryCreate(data.contacts.contactsHistory.contactsHistory)
        );
        dispatch(
          contactsHistoryNotificationSet(
            data.contacts.contactsHistory.contactsHistoryNotification
          )
        );
        dispatch(smsSetNotification(data.sms.smsNotification));
        dispatch(smsCreateHistory(data.sms.smsHistory));
        dispatch(alarmCreateList(data.alarms));
      }
    } catch (error) {
      console.error("Error firestorePullLarge : ", error);
    }
  };

  // =======================================================================================

  const firestorePullNotification = async (data: any) => {
    try {
      if (data) {
        if (
          !deepEqual(
            data.contacts.contactsHistory.contactsHistory,
            contactsHistory
          )
        ) {
          dispatch(
            contactsHistoryCreate(data.contacts.contactsHistory.contactsHistory)
          );
          dispatch(
            contactsHistoryNotificationSet(
              data.contacts.contactsHistory.contactsHistoryNotification
            )
          );
        }
        // ======================================================================

        if (!deepEqual(data.sms.smsHistory, smsHistory)) {
          dispatch(smsSetNotification(data.sms.smsNotification));
          dispatch(smsCreateHistory(data.sms.smsHistory));
        }
      }
    } catch (error) {
      console.error("Error firestorePullNotification : ", error);
    }
  };

  // =======================================================================================

  return {
    firestorePullLarge,
    firestorePullNotification,
  };
};

export default useFirestorePull;
