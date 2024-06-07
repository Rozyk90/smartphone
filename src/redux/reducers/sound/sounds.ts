import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface sounds {
  soundTouch: boolean;
  soundKeyboard: boolean;
  soundCharger: boolean;
  soundLockUnlockScreen: boolean;
}

const initialState: sounds = {
  soundTouch: true,
  soundKeyboard: true,
  soundCharger: true,
  soundLockUnlockScreen: true,
};

export const sliceSoundSounds = createSlice({
  name: "sounds",
  initialState,
  reducers: {
    setSoundTouchOn: (state) => {
      state.soundTouch = true;
    },
    setSoundTouchOff: (state) => {
      state.soundTouch = false;
    },
    setSoundKeyboardOn: (state) => {
      state.soundKeyboard = true;
    },
    setSoundKeyboardOff: (state) => {
      state.soundKeyboard = false;
    },
    setSoundChargerOn: (state) => {
      state.soundCharger = true;
    },
    setSoundChargerOff: (state) => {
      state.soundCharger = false;
    },
    setSoundLockUnlockScreenOn: (state) => {
      state.soundLockUnlockScreen = true;
    },
    setSoundLockUnlockScreenOff: (state) => {
      state.soundLockUnlockScreen = false;
    },
  },
});

export const { 
  setSoundTouchOn, 
  setSoundTouchOff, 
  setSoundKeyboardOn, 
  setSoundKeyboardOff, 
  setSoundChargerOn, 
  setSoundChargerOff, 
  setSoundLockUnlockScreenOn, 
  setSoundLockUnlockScreenOff 
} = sliceSoundSounds.actions;

export default sliceSoundSounds.reducer;