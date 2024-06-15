import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export enum enumSoundModes {
  on = "soundOn",
  vibration = "soundVibration",
  off = "soundOff",
}

interface general {
  mode: enumSoundModes;
  volume: number;
  callSoundID: number;
  notificationSoundID: number;
  callVibrationID: number;
  notificationVibrationID: number;
}

const initialState: general = {
  mode: enumSoundModes.on,
  volume: 50,
  callSoundID: 0,
  notificationSoundID: 0,
  callVibrationID: 0,
  notificationVibrationID: 0,
};

export const sliceSoundGeneral = createSlice({
  name: "general",
  initialState,
  reducers: {
    setSoundOn: (state) => {
      state.mode = enumSoundModes.on;
      state.volume = 20;
    },
    setSoundVibration: (state) => {
      state.mode = enumSoundModes.vibration;
      state.volume = 0;
    },
    setSoundOff: (state) => {
      state.mode = enumSoundModes.off;
      state.volume = 0;
    },
    volumePlus: (state) => {
      state.volume = state.volume + 10;
    },
    volumeMinus: (state) => {
      state.volume = state.volume - 10;
    },
    setCallSound: (state, action) => {
      state.callSoundID = action.payload;
    },
    setNotificationSound: (state, action) => {
      state.notificationSoundID = action.payload;
    },
    setCallVibration: (state, action) => {
      state.callVibrationID = action.payload;
    },
    setNotificationVibration: (state, action) => {
      state.notificationVibrationID = action.payload;
    },
    soundGeneralFirestoreUpdate: (state, action) => {
      const {
        callSoundID,
        notificationSoundID,
        callVibrationID,
        notificationVibrationID,
      } = action.payload;
      state.callSoundID = callSoundID;
      state.notificationSoundID = notificationSoundID;
      state.callVibrationID = callVibrationID;
      state.notificationVibrationID = notificationVibrationID;
    },
  },
});

export const {
  setSoundOn,
  setSoundVibration,
  setSoundOff,
  volumePlus,
  volumeMinus,
  setCallSound,
  setNotificationSound,
  setCallVibration,
  setNotificationVibration,
  soundGeneralFirestoreUpdate,
} = sliceSoundGeneral.actions;

export default sliceSoundGeneral.reducer;
