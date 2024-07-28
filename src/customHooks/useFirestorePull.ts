import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { db } from "../firebase";
import {
  getDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
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
import useSoundNotification from "./useSoundNotification";
import { smsCreateHistory, smsSetNotification } from "../redux/reducers/sms";
import { alarmCreateList } from "../redux/reducers/clock/alarm";

const useFirestorePull = () => {
  const { notificationSoundID, notificationVibrationID } = useAppSelector(
    (state) => state.sound.general
  );
  const isOn = useAppSelector((state) => state.basicStates.isOn);
  const { mode, volume } = useAppSelector((state) => state.sound.general);
  const contactsHistoryNotification = useAppSelector(
    (state) => state.contacts.history.contactsHistoryNotification
  );

  const dispatch = useAppDispatch();
  const { notificationSoundEffect } = useSoundNotification();

  // =======================================================================================

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
        dispatch(smsSetNotification(data.sms.smsNotification))
        dispatch(smsCreateHistory(data.sms.smsHistory))
        dispatch(alarmCreateList(data.alarms))
        // console.log("Pobrano wszystkie stany z firestore");
      }
    } catch (error) {
      console.error("Error firestorePullLarge : ", error);
    }
  };

  // =======================================================================================

  const firestorePullNotification = async (data: any) => {
    try {
      if (data) {
        dispatch(
          contactsHistoryCreate(data.contacts.contactsHistory.contactsHistory)
        );
        dispatch(
          contactsHistoryNotificationSet(
            data.contacts.contactsHistory.contactsHistoryNotification
          )
        );
        // ======================================================================
        dispatch(smsSetNotification(data.sms.smsNotification))
        dispatch(smsCreateHistory(data.sms.smsHistory))
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
