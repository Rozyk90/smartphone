import { useState, useEffect } from "react";
import { enumSoundModes } from "../redux/reducers/sound/general";
import { useAppSelector } from "../redux/hooks";

import soundsList from "../sounds/notificationSounds/notificationSounds";
import vibrationSounds from "../sounds/vibrationSounds/vibrationSounds";


const useSoundNotification = () => {
  const [sound, setSound] = useState(new Audio());
  const [vibration, setVibration] = useState(new Audio());

  const { notificationSoundID, notificationVibrationID } = useAppSelector(
    (state) => state.sound.general
  );
  const { mode, volume } = useAppSelector((state) => state.sound.general);
  const { isOn } = useAppSelector((state) => state.basicStates);

  useEffect(() => {
    sound.preload = "none";
    vibration.preload = "none";

    return () => {
      sound.src = "";
      sound.pause();
      sound.currentTime = 0;

      vibration.src = "";
      vibration.pause();
      vibration.currentTime = 0;
    };
  }, []);


  const notificationSoundEffect = () => {
    const selectedSound = soundsList.find(
      (sound) => sound.id === notificationSoundID
    );
    const selectedVibration = vibrationSounds.find(
      (vibration) => vibration.id === notificationVibrationID
    );

    if (selectedSound && mode === enumSoundModes.on && isOn) {
      sound.src = selectedSound.path;
      sound.volume = volume / 100;
      sound.play();
    }

    if (selectedVibration && mode === enumSoundModes.vibration && isOn) {

      vibration.src = selectedVibration.path;
      vibration.volume = 1;
      vibration.play();
    }
  };

  return {
    notificationSoundEffect,
  };
};

export default useSoundNotification;
