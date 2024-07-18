import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface alarm {
  active: boolean;
  nap:boolean
  unixtimeId: number;
  title: string;
  hour: number;
  minute: number;
  days: string[];
}

interface state {
  alarmToEditId:number|null
  alarms: alarm[];
}

const initialState: state = {
  alarmToEditId:null,
  alarms: [

  ],
};

export const sliceAlarm = createSlice({
  name: "alarm",
  initialState,
  reducers: {
    alarmToEditSet:(state,action)=>{
      state.alarmToEditId = action.payload
    },
    alarmAdd:(state,action)=>{
      state.alarms.push(action.payload)

    },
    alarmUpdate: (state, action) => {
      const { unixtimeId, updatedAlarm } = action.payload;
      const alarmIndex = state.alarms.findIndex(alarm => alarm.unixtimeId === unixtimeId);
      if (alarmIndex !== -1) {
        state.alarms[alarmIndex] = { ...state.alarms[alarmIndex], ...updatedAlarm };
      }
    },
    alarmRemove: (state, action) => {
      const unixtimeId = action.payload;
      state.alarms = state.alarms.filter(alarm => alarm.unixtimeId !== unixtimeId);
    },
    alarmTurnOn: (state, action) => {
      const unixtimeId = action.payload;
      const alarmIndex = state.alarms.findIndex(alarm => alarm.unixtimeId === unixtimeId);
      if (alarmIndex !== -1) {
        state.alarms[alarmIndex].active = true;
      }
    },
    alarmTurnOff: (state, action) => {
      const unixtimeId = action.payload;
      const alarmIndex = state.alarms.findIndex(alarm => alarm.unixtimeId === unixtimeId);
      if (alarmIndex !== -1) {
        state.alarms[alarmIndex].active = false;
      }
    },
  },
});

export const {alarmToEditSet, alarmAdd, alarmUpdate, alarmRemove,alarmTurnOn,alarmTurnOff } = sliceAlarm.actions;

export default sliceAlarm.reducer;
