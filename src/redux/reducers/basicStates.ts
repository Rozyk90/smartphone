import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface basicStates {
  isOn:boolean;
  isRestarting:boolean;
  isVertical: boolean;
  isLocked:boolean;
};

const initialState: basicStates = {
  isOn:true,
  isRestarting:false,
  isVertical: true,
  isLocked: true,
};

export const sliceBasicStates = createSlice({
  name: "basicStates",
  initialState,
  reducers: {
    phoneTurnOn:(state)=>{
      state.isOn = true
    },
    phoneTurnOff:(state)=>{
      state.isOn = false
    },
    phoneIsRestarting:(state)=>{
      state.isRestarting=true
    },
    phoneStopRestarting:(state)=>{
      state.isRestarting=false
    },
    phoneRotate:(state)=>{
        state.isVertical = !state.isVertical
    },phoneLocked:(state)=>{
      state.isLocked = true
    },phoneUnlocked:(state)=>{
      state.isLocked = false
    },
  },
});

export const {phoneTurnOn,phoneTurnOff,phoneIsRestarting,phoneStopRestarting,phoneRotate,phoneLocked,phoneUnlocked} = sliceBasicStates.actions;

export default sliceBasicStates.reducer;