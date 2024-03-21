import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface state {
  background: string;
  isScreenActive: boolean;
  countDownTimer: number;
  countDownTimerShort: number;
  countDown: number;
  isCountingDown: boolean;
}

const initialState: state = {
  background:
    "radial-gradient(circle, rgba(127,142,170,1) 19%, rgba(53,104,150,1) 61%)",
  isScreenActive: false,
  countDownTimer: 10000,
  countDownTimerShort: 10000,
  countDown: 10000,
  isCountingDown: false,
};

export const screenGeneralSlice = createSlice({
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
    setStartCountingDown: (state) => {
      state.isCountingDown = true;
    },
    setStopCountingDown: (state) => {
      state.isCountingDown = false;
    },
    resetScreenCountingDownShort: (state) =>{
      state.countDown = 10000
    },
    stopCountingDown: (state) =>{
      state.countDown = 0
      state.isCountingDown = false
    }
  },
});

export const {
  screenTurnOn,
  screenTurnOff,
  updateScreenCountDown,
  setStartCountingDown,
  setStopCountingDown,
  resetScreenCountingDownShort,
  stopCountingDown
} = screenGeneralSlice.actions;

export default screenGeneralSlice.reducer;
