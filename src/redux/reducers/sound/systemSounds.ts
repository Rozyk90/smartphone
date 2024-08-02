import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface systemSounds {
  soundTouch: boolean;
  soundKeyboard: boolean;
  soundCharger: boolean;
  soundLockUnlockScreen: boolean;
}

const initialState: systemSounds = {
  soundTouch: true,
  soundKeyboard: true,
  soundCharger: true,
  soundLockUnlockScreen: true,
};

export const sliceSystemSounds = createSlice({
  name: "sounds",
  initialState,
  reducers: {
    systemSoundDefault: (state) => {
      state.soundTouch = true;
      state.soundKeyboard = true;
      state.soundCharger = true;
      state.soundLockUnlockScreen = true;
    },
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
    systemSoundsFirestoreUpdate: (state, action) => {
      const { soundTouch, soundKeyboard, soundCharger, soundLockUnlockScreen } =
        action.payload;
      state.soundTouch = soundTouch;
      state.soundKeyboard = soundKeyboard;
      state.soundCharger = soundCharger;
      state.soundLockUnlockScreen = soundLockUnlockScreen;
    },
  },
});

export const {systemSoundDefault,
  setSoundTouchOn,
  setSoundTouchOff,
  setSoundKeyboardOn,
  setSoundKeyboardOff,
  setSoundChargerOn,
  setSoundChargerOff,
  setSoundLockUnlockScreenOn,
  setSoundLockUnlockScreenOff,
  systemSoundsFirestoreUpdate,
} = sliceSystemSounds.actions;

export default sliceSystemSounds.reducer;
