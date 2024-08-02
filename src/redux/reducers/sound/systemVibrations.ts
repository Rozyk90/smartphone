import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface vibrations {
  vibrationTouch: boolean;
  vibrationKeyboard: boolean;
  vibrationCharger: boolean;
  vibrationLockUnlockScreen: boolean;
}

const initialState: vibrations = {
  vibrationTouch: true,
  vibrationKeyboard: true,
  vibrationCharger: true,
  vibrationLockUnlockScreen: true,
};

export const sliceSystemVibrations = createSlice({
  name: "vibrations",
  initialState,
  reducers: {
    systemVibrationDefault: (state) => {
      state.vibrationTouch = true;
      state.vibrationKeyboard = true;
      state.vibrationCharger = true;
      state.vibrationLockUnlockScreen = true;
    },
    setVibrationTouchOn: (state) => {
      state.vibrationTouch = true;
    },
    setVibrationTouchOff: (state) => {
      state.vibrationTouch = false;
    },
    setVibrationKeyboardOn: (state) => {
      state.vibrationKeyboard = true;
    },
    setVibrationKeyboardOff: (state) => {
      state.vibrationKeyboard = false;
    },
    setVibrationChargerOn: (state) => {
      state.vibrationCharger = true;
    },
    setVibrationChargerOff: (state) => {
      state.vibrationCharger = false;
    },
    setVibrationLockUnlockScreenOn: (state) => {
      state.vibrationLockUnlockScreen = true;
    },
    setVibrationLockUnlockScreenOff: (state) => {
      state.vibrationLockUnlockScreen = false;
    },
    systemVibrationsFirestoreUpdate: (state, action) => {
      const {
        vibrationTouch,
        vibrationKeyboard,
        vibrationCharger,
        vibrationLockUnlockScreen,
      } = action.payload;
      state.vibrationTouch = vibrationTouch;
      state.vibrationKeyboard = vibrationKeyboard;
      state.vibrationCharger = vibrationCharger;
      state.vibrationLockUnlockScreen = vibrationLockUnlockScreen;
    },
  },
});

export const {
  systemVibrationDefault,
  setVibrationTouchOn,
  setVibrationTouchOff,
  setVibrationKeyboardOn,
  setVibrationKeyboardOff,
  setVibrationChargerOn,
  setVibrationChargerOff,
  setVibrationLockUnlockScreenOn,
  setVibrationLockUnlockScreenOff,
  systemVibrationsFirestoreUpdate,
} = sliceSystemVibrations.actions;

export default sliceSystemVibrations.reducer;
