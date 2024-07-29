import AutoDarkModeEffect from "./effects/autoDarkModeEffect";
import FireBaseAuthEffect from "./effects/fireBaseAuthEffect";
import FirestorePushEffect from "./effects/firestorePushEffect";
import NotificationSoundEffect from "./effects/notificationSoundEffect";
import InteractionDetectEffect from "./effects/interactionDetectEffect";
import RealtimeDataEffect from "./effects/realtimeDataEffect";
import TimeEffect from "./effects/timeEffect";

export default function GlobalEffects() {
  return (
    <>
      <AutoDarkModeEffect />
      <FireBaseAuthEffect />
      <FirestorePushEffect />
      <NotificationSoundEffect />
      <InteractionDetectEffect />
      <RealtimeDataEffect />
      <TimeEffect/>
    </>
  );
}
