import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { enumCurrentScreen } from "./enumsScreen";

interface state {
  isScreenOn: boolean;
  countDown: number;
  countDownTimerSelected: number;
  reversingBoard: enumCurrentScreen[];
}

const initialState: state = {
  isScreenOn: false,
  countDown: 0,
  countDownTimerSelected: 15000,
  reversingBoard: [],
};

export const screenGeneralSlice = createSlice({
  name: "screen",
  initialState,
  reducers: {
    screenTurnOn: (state) => {
      state.isScreenOn = true;
    },
    screenTurnOff: (state) => {
      state.isScreenOn = false;
    },
    // ======================================================================================
    countDownSetTimer: (state, action: PayloadAction<number>) => {
      state.countDownTimerSelected = action.payload;
    },
    countDownUpdateTime: (state, action: PayloadAction<number>) => {
      state.countDown = action.payload;
    },
    // ==============================================
    reversingBoardPush: (state, action: PayloadAction<enumCurrentScreen>) => {
      state.reversingBoard = [...state.reversingBoard, action.payload];
    },
    reversingBoardPop: (state) => {
      state.reversingBoard.pop();
    },
    reversingBoardClear: (state) => {
      state.reversingBoard = [];
    },
    screenGeneralDefault: (state) => {
      state.countDownTimerSelected = 15000;
    },
  },
});

export const {
  screenTurnOn,
  screenTurnOff,
  countDownSetTimer,
  countDownUpdateTime,
  reversingBoardPush,
  reversingBoardPop,
  reversingBoardClear,
  screenGeneralDefault,
} = screenGeneralSlice.actions;

export default screenGeneralSlice.reducer;
