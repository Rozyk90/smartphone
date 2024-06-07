import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export enum enumSoundModes {
  on = 'soundOn',
  vibration = "soundVibration",
  off = "soundOff",
}


interface general {
  mode:enumSoundModes
  volume:number
};

const initialState: general = {
  mode:enumSoundModes.on,
  volume:50
}

export const sliceSoundGeneral = createSlice({
  name: "general",
  initialState,
  reducers: {
    setSoundOn:(state) =>{
      state.mode = enumSoundModes.on
      state.volume = 20
    },
    setSoundVibration:(state) =>{
      state.mode = enumSoundModes.vibration
      state.volume = 0
    },
    setSoundOff:(state) =>{
      state.mode = enumSoundModes.off
      state.volume = 0
      
    },volumePlus:(state) =>{
      state.volume = state.volume + 10
    },volumeMinus:(state) =>{
      state.volume = state.volume - 10
    }
  },
});

export const {setSoundOn,setSoundVibration,setSoundOff,volumePlus,volumeMinus} = sliceSoundGeneral.actions;

export default sliceSoundGeneral.reducer;
