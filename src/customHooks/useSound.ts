import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { enumSoundModes } from "../redux/reducers/sound/general";

import vibrationL from "../sounds/systemSounds/vibrationLight.mp3";
import vibrationS from "../sounds/systemSounds/vibrationStrong.mp3";
import click from "../sounds/systemSounds/click.mp3";
import keyboard from "../sounds/systemSounds/keyboard.mp3";
import info from "../sounds/systemSounds/info.mp3";
import lock from "../sounds/systemSounds/lock.mp3";

const useSound = () => {
  const [vibrationLight] = useState(() => {
    const audio = new Audio(vibrationL);
    audio.preload = "auto";
    return audio;
  });
  const [vibrationStrong] = useState(() => {
    const audio = new Audio(vibrationS);
    audio.preload = "auto";
    return audio;
  });
  const [clickSound] = useState(() => {
    const audio = new Audio(click);
    audio.preload = "auto";
    return audio;
  });
  const [keyboardSound] = useState(() => {
    const audio = new Audio(keyboard);
    audio.preload = "auto";
    return audio;
  });
  const [lockSound] = useState(() => {
    const audio = new Audio(lock);
    audio.preload = "auto";
    return audio;
  });
  const [infoSound] = useState(() => {
    const audio = new Audio(info);
    audio.preload = "auto";
    return audio;
  });

  // =======================================================================================
  const { isOn } = useAppSelector(state => state.basicStates)
  const { volume, mode } = useAppSelector((state) => state.sound.general);
  const { soundTouch, soundKeyboard, soundCharger, soundLockUnlockScreen } =
    // =======================================================================================
    useAppSelector((state) => state.sound.systemSounds);
  const {
    vibrationTouch,
    vibrationKeyboard,
    vibrationCharger,
    vibrationLockUnlockScreen,
  } = useAppSelector((state) => state.sound.systemVibration);

  const dispatch = useAppDispatch();
  // =======================================================================================

  const btnSoundEffect = () => {
    if (mode === enumSoundModes.on && soundTouch) {
      console.log("dzwiek");

      clickSound.volume = volume / 100;
      clickSound.play();
    }
    if (mode === enumSoundModes.vibration && vibrationTouch) {
      console.log("wibracja");
      vibrationLight.volume = 1;
      vibrationLight.play();
    }
  };

  const keyboardSoundEffect = () =>{
    if (mode === enumSoundModes.on && soundKeyboard) {
      console.log("dzwiek klawa");

      keyboardSound.volume = volume / 100;
      keyboardSound.play();
    }
    if (mode === enumSoundModes.vibration && vibrationKeyboard) {
      console.log("wibracja klawa");
      vibrationLight.volume = 1;
      vibrationLight.play();
    }
  }

  const lockSoundEffect = () => {
    if (mode === enumSoundModes.on && soundLockUnlockScreen) {
      console.log("dzwiek lock");

      lockSound.volume = volume / 100;
      lockSound.play();
    }
    if (mode === enumSoundModes.vibration && vibrationLockUnlockScreen) {
      console.log("wibracja lock");
      vibrationStrong.volume = 1;
      vibrationStrong.play();
    }
  };

  const plugSoundEffect = () => {

    if (mode === enumSoundModes.on && soundCharger && isOn) {
      console.log("dzwiek wtyczka");
      infoSound.volume = volume / 100;
      infoSound.play();
    }
    if (mode === enumSoundModes.vibration && vibrationCharger && isOn) {
      console.log("wibracja ladowarka");
      vibrationStrong.volume = 1;
      vibrationStrong.play();
    }
  };

  const volumeBtnEffect = (isAdding: boolean) => {
    if (isAdding && isOn) {
      infoSound.volume = Math.min(volume + 10, 100) / 100;
      infoSound.play();
    } else if (isOn) {
      if (volume > 10) {
        infoSound.volume = (volume - 10) / 100;
        infoSound.play();
      } else {
        vibrationStrong.volume = 1;
        vibrationStrong.play();
      }
    }
  };

  return { btnSoundEffect,keyboardSoundEffect, lockSoundEffect, plugSoundEffect, volumeBtnEffect };
};

export default useSound;
