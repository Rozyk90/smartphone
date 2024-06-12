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
  },
});

export const { 
  setVibrationTouchOn, 
  setVibrationTouchOff, 
  setVibrationKeyboardOn, 
  setVibrationKeyboardOff, 
  setVibrationChargerOn, 
  setVibrationChargerOff, 
  setVibrationLockUnlockScreenOn, 
  setVibrationLockUnlockScreenOff 
} = sliceSystemVibrations.actions;

export default sliceSystemVibrations.reducer;