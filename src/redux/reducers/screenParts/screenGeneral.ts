import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { enumCurrentScreen } from "./enumsScreen";

interface state {
  isScreenActive: boolean;
  countDownTimer: number;
  countDownTimerShort: number;
  countDown: number;
  isCountingDown: boolean;
  reversingBoard: enumCurrentScreen[];
}

const initialState: state = {
  isScreenActive: false,
  countDownTimer: 10000,
  countDownTimerShort: 10000,
  countDown: 10000,
  isCountingDown: false,
  reversingBoard: [],
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
    resetScreenCountingDownShort: (state) => {
      state.countDown = 10000;
    },
    stopCountingDown: (state) => {
      state.countDown = 0;
      state.isCountingDown = false;
    },
    reversingBoardPush: (state, action: PayloadAction<enumCurrentScreen>) => {
      state.reversingBoard = [...state.reversingBoard, action.payload];
    },
    reversingBoardPop: (state) => {
      state.reversingBoard.pop();
    },
    reversingBoardClear: (state) => {
      state.reversingBoard = [];
    },
  },
});

export const {
  screenTurnOn,
  screenTurnOff,
  updateScreenCountDown,
  setStartCountingDown,
  setStopCountingDown,
  resetScreenCountingDownShort,
  stopCountingDown,
  reversingBoardPush,
  reversingBoardPop,
  reversingBoardClear,
} = screenGeneralSlice.actions;

export default screenGeneralSlice.reducer;
