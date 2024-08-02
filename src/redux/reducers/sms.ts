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
  smsNotification: boolean;
  smsHistory: Conversation[];
}

const initialState: smsState = {
  smsTo: "",
  smsNotification: true,
  smsHistory: [
    {
      elementId: 123123123,
      smsToNumber: "828459806",
      smsToUid: "r8dCTJS3LAY2BosrYTu5EUBaLfb2",
      conversation: [
        {
          unixtime: 1722447242000,
          unixtimeId: 1722447242,
          authorNumber: "828459806",
          txt: "Hej! Ciesze się, że tu jesteś. Twoja opinia jest dla mnie bardzo ważna. Jeśli masz jakieś sugestie, napisz je tutaj. Dzięki i pozdrawiam :)",
        },
      ],
    },
  ],
};

export const sliceSms = createSlice({
  name: "sms",
  initialState,
  reducers: {
    smsDefault: (state) => {
      state.smsTo = "";
      state.smsNotification = true;
      state.smsHistory = [
        {
          elementId: 123123123,
          smsToNumber: "828459806",
          smsToUid: "r8dCTJS3LAY2BosrYTu5EUBaLfb2",
          conversation: [
            {
              unixtime: 1722447242000,
              unixtimeId: 1722447242,
              authorNumber: "828459806",
              txt: "Hej! Ciesze się, że tu jesteś. Twoja opinia jest dla mnie bardzo ważna. Jeśli masz jakieś sugestie, napisz je tutaj. Dzięki i pozdrawiam :)",
            },
          ],
        },
      ];
    },
    smsOpenWith: (state, action) => {
      state.smsTo = action.payload;
    },
    smsSetNotification: (state, action) => {
      state.smsNotification = action.payload;
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

export const {
  smsDefault,
  smsOpenWith,
  smsSetNotification,
  smsCreateHistory,
  smsPushMessage,
} = sliceSms.actions;

export default sliceSms.reducer;
