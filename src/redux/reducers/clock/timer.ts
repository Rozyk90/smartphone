import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface state {
  isRunning: boolean;
    unixtimeStart: number;
    unixtimeStartBreak:number;
    breaks:number[];
    unixtimeWhenRing:number;
}

const initialState: state = {
    isRunning: false,
    unixtimeStart: 0,
  unixtimeStartBreak:0,
  breaks:[],
  unixtimeWhenRing:0


};

export const sliceTimer = createSlice({
  name: "timer",
  initialState,
  reducers: {
    timerStart: (state, action:PayloadAction<{startTime:number,ringTime:number}>) => {
        state.isRunning = true;
        state.unixtimeStart = action.payload.startTime;
        state.unixtimeWhenRing = action.payload.ringTime;
      },
      timerStop: (state,action:PayloadAction<{breakTime:number}>) => {
        state.isRunning = false;
        state.unixtimeStartBreak=action.payload.breakTime
      },
      timerReset: (state) => {
        state.isRunning = false;
        state.unixtimeStart = 0;
        state.unixtimeStartBreak = 0;
        state.breaks =[]
      },
      timerResume:(state,action:PayloadAction<{breakTime:number}>)=>{
        state.isRunning = true;
        state.breaks.push(action.payload.breakTime)
      }
  },
});

export const {timerStart,timerStop,timerReset,timerResume  } = sliceTimer.actions;

export default sliceTimer.reducer;
