import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Message = {
  unixtime: number;
  unixtimeId: number;
  authorNumber: string;
  txt: string;
};

type Conversation = {
  elementId: number;
  smsToNumber: string;
  smsToUid: string | null;
  conversation: Message[];
};

interface smsState {
  smsTo: string;
  smsNotification:boolean
  smsHistory: Conversation[];
}

const initialState: smsState = {
  smsTo: "",
  smsNotification:false,
  smsHistory: [

  ],
};

export const sliceSms = createSlice({
  name: "sms",
  initialState,
  reducers: {
    smsOpenWith: (state, action) => {
      state.smsTo = action.payload;
    },smsSetNotification:(state,action)=>{
      state.smsNotification = action.payload
    },
    smsCreateHistory: (state, action) => {
      state.smsHistory = action.payload;
    },
    smsPushMessage: (state, action) => {
      const messageObj = action.payload;

      const conversation = state.smsHistory.find(
        (conv) => conv.smsToNumber === messageObj.smsToNumber
      );
      if (conversation) {
        conversation.conversation.push(messageObj.message);
      } else {
        state.smsHistory.push({
          elementId: messageObj.elementId,
          smsToNumber: messageObj.smsToNumber,
          smsToUid: messageObj.smsToUid,
          conversation: [messageObj.message],
        });
      }
    },
  },
});

export const { smsOpenWith,smsSetNotification, smsCreateHistory, smsPushMessage } = sliceSms.actions;

export default sliceSms.reducer;
