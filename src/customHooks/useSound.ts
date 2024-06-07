import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { enumSoundModes } from "../redux/reducers/sound/general";

import vibrationL from "../sounds/systemSounds/vibrationLight.mp3";
import vibrationS from "../sounds/systemSounds/vibrationStrong.mp3";
import click from "../sounds/systemSounds/click.mp3";
import keyboard from "../sounds/systemSounds/keyboard.mp3";
import charging from "../sounds/systemSounds/charging.mp3";
import lock from "../sounds/systemSounds/lock.mp3";


const useSound = () => {
  const [vibrationLight] = useState(new Audio(vibrationL)); 
  const [vibrationStrong] = useState(new Audio(vibrationS)); 
  const [clickSound] = useState(new Audio(click)); 
  const [lockSound] = useState(new Audio(lock)); 

  // =======================================================================================

  const { volume, mode } = useAppSelector((state) => state.sound.general);
  const { soundTouch, soundKeyboard, soundCharger, soundLockUnlockScreen } =
    // =======================================================================================
    useAppSelector((state) => state.sound.sounds);
  const {
    vibrationTouch,
    vibrationKeyboard,
    vibrationCharger,
    vibrationLockUnlockScreen,
  } = useAppSelector((state) => state.sound.vibration);

  const dispatch = useAppDispatch();
  // =======================================================================================

  const btnSoundEffect = () => {
    if (mode === enumSoundModes.on && soundTouch) {
      console.log("dzwiek")

      clickSound.volume = volume / 100;
      clickSound.play();
    }
    if (mode === enumSoundModes.vibration && vibrationTouch) {
      console.log("wibracja")
      vibrationLight.volume = 1;
      vibrationLight.play();
    }
  };

  const lockSoundEffect = () =>{
    if (mode === enumSoundModes.on && soundLockUnlockScreen) {
      console.log("dzwiek lock")

      lockSound.volume = volume / 100;
      lockSound.play();
    }
    if (mode === enumSoundModes.vibration && vibrationLockUnlockScreen) {
      console.log("wibracja lock")
      vibrationStrong.volume = 1;
      vibrationStrong.play();
    }
  }

  return { btnSoundEffect,lockSoundEffect };
};

export default useSound;
