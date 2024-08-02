import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import useSoundNotification from "../../customHooks/useSoundNotification";

export default function NotificationSoundEffect() {
  const [mounted, setMounted] = useState(false);

  const {wasInteraction,doFirstUpdate} = useAppSelector(
    (state) => state.pageStates
  );
  const {isLogged} = useAppSelector(state => state.user)
  const { contactsHistory, contactsHistoryNotification } = useAppSelector(
    (state) => state.contacts.history
  );
  const {smsHistory,smsNotification} = useAppSelector(state => state.sms)

  const { notificationSoundEffect } = useSoundNotification();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if ((contactsHistoryNotification || smsNotification) && mounted && wasInteraction && isLogged && !doFirstUpdate) {
      notificationSoundEffect();
    }
  }, [contactsHistory, contactsHistoryNotification, smsHistory]);

  return null;
}
