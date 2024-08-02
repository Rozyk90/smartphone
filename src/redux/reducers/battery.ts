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
  battery: 50,
  isPlugConnected: false,
  isCharging: false,
  isShowingValue: true,
  isFastCharging: true,
  isBatteryProtection: true,
  isBatteryDescription: true,
};

export const sliceBattery = createSlice({
  name: "battery",
  initialState,
  reducers: {
    batteryDefault: (state) => {
      state.isShowingValue = true;
      state.isFastCharging = true;
      state.isBatteryProtection = true;
      state.isBatteryDescription = true;
    },
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
    // =====================================================
    batteryFirestoreUpdate: (state, action) => {
      const {
        isShowingValue,
        isFastCharging,
        isBatteryProtection,
        isBatteryDescription,
      } = action.payload;
      state.isShowingValue = isShowingValue;
      state.isFastCharging = isFastCharging;
      state.isBatteryProtection = isBatteryProtection;
      state.isBatteryDescription = isBatteryDescription;
    },
  },
});

export const {
  batteryDefault,
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
  batteryFirestoreUpdate,
} = sliceBattery.actions;

export default sliceBattery.reducer;
