import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import useSoundNotification from "../../customHooks/useSoundNotification";

export default function NotificationSoundEffect() {
  const [mounted, setMounted] = useState(false);

  const wasInteraction = useAppSelector(
    (state) => state.pageStates.wasInteraction
  );
  const { contactsHistory, contactsHistoryNotification } = useAppSelector(
    (state) => state.contacts.history
  );

  const { notificationSoundEffect } = useSoundNotification();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (contactsHistoryNotification && mounted && wasInteraction) {
      notificationSoundEffect();
    }
  }, [contactsHistory, contactsHistoryNotification]);

  return null;
}
