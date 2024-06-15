import { useAppDispatch } from "../redux/hooks";
import { db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import { batteryFirestoreUpdate } from "../redux/reducers/battery";
import { themeFirestoreUpdate } from "../redux/reducers/theme";
import { soundGeneralFirestoreUpdate } from "../redux/reducers/sound/general";
import { systemSoundsFirestoreUpdate } from "../redux/reducers/sound/systemSounds";
import { systemVibrationsFirestoreUpdate } from "../redux/reducers/sound/systemVibrations";
import { countDownSetTimer } from "../redux/reducers/screenParts/screenGeneral";
import { updateScreenGrid } from "../redux/reducers/screenParts/screenCenter";

const useFirestorePull = () => {
  const dispatch = useAppDispatch();

  const firestorePull = async (uid: string) => {
    console.log("uruchamiam pull");

    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    if (data) {
      console.log("uruchamiam pull -> to dispacze");

      dispatch(batteryFirestoreUpdate(data.settings.battery));
      dispatch(themeFirestoreUpdate(data.settings.theme));
      dispatch(soundGeneralFirestoreUpdate(data.settings.sound.general));
      dispatch(systemSoundsFirestoreUpdate(data.settings.sound.systemSounds));
      dispatch(
        systemVibrationsFirestoreUpdate(data.settings.sound.systemVibrations)
      );
      dispatch(countDownSetTimer(data.settings.screen.countDownTimerSelected));
      dispatch(updateScreenGrid(data.settings.screen.screenGrid));
    }
  };

  return {
    firestorePull,
  };
};

export default useFirestorePull;
