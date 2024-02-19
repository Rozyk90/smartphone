import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface battery {
    battery:number
    isPlugConnected:boolean
    isCharging:boolean
    isShowingValue:boolean
    isFastCharging:boolean
    isBatteryProtection:boolean
};

const initialState: battery = {
    battery:50,
    isPlugConnected:true,
    isCharging:true,
    isShowingValue:true,
    isFastCharging:false,
    isBatteryProtection:false,
};

export const sliceBattery = createSlice({
  name: "battery",
  initialState,
  reducers: {
    batteryUpdate:(state,action:PayloadAction<number>)=>{
        state.battery = action.payload
    },
    plugStatus:(state)=>{
      state.isPlugConnected = !state.isPlugConnected 
    },
    chargingStatus:(state)=>{
      state.isCharging = !state.isCharging 
    },
    showingValueStatus:(state)=>{
      state.isShowingValue = !state.isShowingValue 
    },
    fastChargingStatus:(state)=>{
      state.isFastCharging = !state.isFastCharging 
    },
    batteryProtectionStatus:(state)=>{
      state.isBatteryProtection = !state.isBatteryProtection 
    },
  },
});

export const {batteryUpdate,plugStatus,chargingStatus,showingValueStatus,fastChargingStatus,batteryProtectionStatus} = sliceBattery.actions;

export default sliceBattery.reducer;

