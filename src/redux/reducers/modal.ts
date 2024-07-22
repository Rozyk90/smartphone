import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum enumModalTurnOffBtnsFocus {
  all = "all",
  off = "off",
  reset = "reset",
  sos = "sos",
}

export enum enumCurrentModal {
  modalNone = 'modalNone',
  modalTurnOffBtns = 'modalTurnOffBtns',
  modalAlarmRinging = 'modalAlarmRinging',
}


interface alarmData {
  alarmType:'alarm'|'timer'
  title:string
description:string
}

interface modal {
  isModalActive: boolean,
  currentModal:enumCurrentModal
  turnOffBtnsFocus:enumModalTurnOffBtnsFocus
  alarmData:alarmData
};

const initialState: modal = {
  isModalActive:false,
  currentModal:enumCurrentModal.modalNone,
  turnOffBtnsFocus:enumModalTurnOffBtnsFocus.all,
  alarmData:{
    alarmType:'timer',
    title:'asdada',
    description:'bcbvc b c b c'

  }
}

export const sliceModal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    modalTurnOn: (state) => {
      state.isModalActive = true;
    },
    modalTurnOff: (state) => {
      state.isModalActive = false;
    },
    setCurrentModal:(state,action:PayloadAction<enumCurrentModal>)=>{
      state.currentModal = action.payload
    },
    setTurnOffBtnsFocus:(state,action:PayloadAction<enumModalTurnOffBtnsFocus>)=>{
      state.turnOffBtnsFocus = action.payload
    }
  },
});

export const {modalTurnOn,modalTurnOff,setCurrentModal,setTurnOffBtnsFocus} = sliceModal.actions;

export default sliceModal.reducer;
