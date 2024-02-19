import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";



export enum enumCurrentBarTop {
  on = 'on',
  off='off',
  none = 'none'
}

export enum enumCurrentScreen {
  screenNone = "screenNone",
  screenStartupAnimation = "screenStartupAnimation",
  screenTurnOffAnimation = "screenTurnOffAnimation",
  screenActiveBlocked = "screenActiveBlocked",
}

export enum enumCurrentBarBottom{
  on = 'on',
  off = 'off',
  none='none',
  backOnly = 'backOnly'
}

interface screen {
  background: string;
  currentBarTop:enumCurrentBarTop
  currentScreen: enumCurrentScreen;
  currentBarBottom:enumCurrentBarBottom;
  isScreenActive: boolean;
  countDownTimer: number;
  countDownTimerShort: number;
  countDown: number;
  isCountingDown:boolean;
}

const initialState: screen = {
  background: '#B7CDB5',
  currentBarTop:enumCurrentBarTop.off,
  currentScreen: enumCurrentScreen.screenNone,
  currentBarBottom: enumCurrentBarBottom.off,
  isScreenActive: false,
  countDownTimer: 10000,
  countDownTimerShort: 7000,
  countDown: 7000,
  isCountingDown:false
};

export const sliceScreen = createSlice({
  name: "screen",
  initialState,
  reducers: {
    screenTurnOn: (state) => {
      state.isScreenActive = true;
    },
    screenTurnOff: (state) => {
      state.isScreenActive = false;
    },
    updateScreenCountDown: (state, action: PayloadAction<number>) => {
      state.countDown = action.payload;
    },
    setCurrenBarTop: (state, action: PayloadAction<enumCurrentBarTop>) => {
      state.currentBarTop = action.payload;
    },
    setCurrentScreen: (state, action: PayloadAction<enumCurrentScreen>) => {
      state.currentScreen = action.payload;
    },
    setCurrentBarBottom: (state, action: PayloadAction<enumCurrentBarBottom>) => {
      state.currentBarBottom = action.payload;
    },
    setStartCountingDown:(state)=>{
      state.isCountingDown = true
    },
    setStopCountingDown:(state)=>{
      state.isCountingDown = false
    },
  },
});

export const {
  screenTurnOn,
  screenTurnOff,
  updateScreenCountDown,setCurrenBarTop,
  setCurrentScreen,
  setCurrentBarBottom,
  setStartCountingDown,
  setStopCountingDown,
} = sliceScreen.actions;

export default sliceScreen.reducer;








