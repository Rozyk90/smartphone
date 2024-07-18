import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Lap {
    overallTime: string;
    lapTime: string;
    id:number
  }

interface state {
  isRunning: boolean;
  unixtimeStart: number;
  unixtimeLapStart: number;
  unixtimeStartBreak:number;
  lapTimes:Lap[];
  breaks:number[];
  lapBreaks:number[]
}

const initialState: state = {
  isRunning: false,
  unixtimeStart: 0,
  unixtimeLapStart:0,
  unixtimeStartBreak:0,
  lapTimes:[],
  breaks:[],
  lapBreaks:[]
};

export const sliceStopwatch = createSlice({
  name: "stopwatch",
  initialState,
  reducers: {
    stopwatchStart: (state, action) => {
      state.isRunning = true;
      state.unixtimeStart = action.payload;
    },
    stopwatchStop: (state,action:PayloadAction<{breakTime:number}>) => {
      state.isRunning = false;
      state.unixtimeStartBreak=action.payload.breakTime
    },
    stopwatchReset: (state) => {
      state.isRunning = false;
      state.unixtimeStart = 0;
      state.unixtimeLapStart = 0;
      state.unixtimeStartBreak = 0;
      state.lapTimes = [];
      state.breaks =[]
      state.lapBreaks =[]
    },
    stopwatchSave: (state,action:PayloadAction<{nextLap:number,lapObj:Lap}>) => {
        state.unixtimeLapStart = action.payload.nextLap
        state.lapTimes.unshift(action.payload.lapObj)
      state.lapBreaks = []
    },
    stopwatchResume:(state,action:PayloadAction<{breakTime:number}>)=>{
      state.isRunning = true;
      state.breaks.push(action.payload.breakTime)
      state.lapBreaks.push(action.payload.breakTime)
    }
  },
});

export const { stopwatchStart, stopwatchStop,stopwatchReset,stopwatchSave,stopwatchResume } = sliceStopwatch.actions;

export default sliceStopwatch.reducer;
