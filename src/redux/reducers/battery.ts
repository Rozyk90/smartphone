import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface battery {
  battery: number;
  isPlugConnected: boolean;
  isCharging: boolean;
  isShowingValue: boolean;
  isFastCharging: boolean;
  isBatteryProtection: boolean;
  isBatteryDescription: boolean;
}

const initialState: battery = {
  battery: 99,
  isPlugConnected: false,
  isCharging: false,
  isShowingValue: true,
  isFastCharging: false,
  isBatteryProtection: false,
  isBatteryDescription: true, // is not ussing right now
};

export const sliceBattery = createSlice({
  name: "battery",
  initialState,
  reducers: {
    batteryUpdate: (state, action: PayloadAction<number>) => {
      state.battery = action.payload;
    },
    plugStatus: (state) => {
      state.isPlugConnected = !state.isPlugConnected;
    },
    chargingStatus: (state) => {
      state.isCharging = !state.isCharging;
    },
    // =====================================================
    batteryProtectionOn: (state) => {
      state.isBatteryProtection = true;
    },
    batteryProtectionOff: (state) => {
      state.isBatteryProtection = false;
    },
    batteryValueOn: (state) => {
      state.isShowingValue = true;
    },
    batteryValueOff: (state) => {
      state.isShowingValue = false;
    },
    batteryFastChargingOn: (state) => {
      state.isFastCharging = true;
    },
    batteryFastChargingOff: (state) => {
      state.isFastCharging = false;
    },
    batteryDescriptionOn: (state) => {
      state.isBatteryDescription = true;
    },
    batteryDescriptionOff: (state) => {
      state.isBatteryDescription = false;
    },
  },
});

export const {
  batteryUpdate,
  plugStatus,
  chargingStatus,
  batteryProtectionOn,
  batteryProtectionOff,
  batteryValueOn,
  batteryValueOff,
  batteryFastChargingOn,
  batteryFastChargingOff,
  batteryDescriptionOn,
  batteryDescriptionOff,
} = sliceBattery.actions;

export default sliceBattery.reducer;
