import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { enumIcons } from "../../components/icons/enumsIcon";



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
  screenMain = 'screenMain',
}

export enum enumCurrentBarBottom{
  on = 'on',
  off = 'off',
  none='none',
  backOnly = 'backOnly'
}

interface screen {
  background: string;
  currentBarTop: enumCurrentBarTop;
  currentScreen: enumCurrentScreen;
  currentBarBottom: enumCurrentBarBottom;
  isScreenActive: boolean;
  countDownTimer: number;
  countDownTimerShort: number;
  countDown: number;
  isCountingDown: boolean;
  screenGrid: Array<enumIcons>; // Replace YourElementType with the actual type
}

const initialState: screen = {
  background: 'radial-gradient(circle, rgba(127,142,170,1) 19%, rgba(53,104,150,1) 61%)',
  currentBarTop:enumCurrentBarTop.off,
  currentScreen: enumCurrentScreen.screenNone,
  currentBarBottom: enumCurrentBarBottom.off,
  isScreenActive: false,
  countDownTimer: 10000,
  countDownTimerShort: 10000,
  countDown: 10000,
  isCountingDown:false,
  screenGrid:[    enumIcons.appShop,
    enumIcons.calendar,
    enumIcons.clock,
    enumIcons.settings,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,]
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
    updateScreenGrid:(state,action:PayloadAction<Array<enumIcons>>)=>{
      state.screenGrid = action.payload

    }
  },
});

export const {
  screenTurnOn,
  screenTurnOff,
  updateScreenCountDown,setCurrenBarTop,
  setCurrentScreen,
  setCurrentBarBottom,
  setStartCountingDown,
  setStopCountingDown,updateScreenGrid,
} = sliceScreen.actions;

export default sliceScreen.reducer;








