import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ContactHistoryObj {
  unixTime: number;
  elementId:number;
  whoCall: string;
  whoCallUid: string;
  toWho: string;
  toWhoUid: string | null;
}

type Notifications = true|false

interface ContactsState {
  contactsHistory: ContactHistoryObj[];
  contactsHistoryNotification: Notifications;
}

const initialState: ContactsState = {
  contactsHistory: [],
  contactsHistoryNotification: false,
};

export const sliceContactsHistory = createSlice({
  name: "contactsHistory",
  initialState,
  reducers: {
    contactsHistoryCreate: (
      state,
      action: PayloadAction<ContactHistoryObj[]>
    ) => {
      state.contactsHistory = action.payload;
    },
    contactsHistoryAdd: (state, action: PayloadAction<ContactHistoryObj>) => {
      state.contactsHistory.push(action.payload);
    },
    contactsHistoryDelete: (state, action: PayloadAction<number>) => {
      state.contactsHistory = state.contactsHistory.filter(
        (call) => call.unixTime !== action.payload
      );
    },
    contactsHistoryNotificationSet: (state,action:PayloadAction<Notifications>) => {
      state.contactsHistoryNotification = action.payload
    },

  },
});

export const {
  contactsHistoryAdd,
  contactsHistoryDelete,
  contactsHistoryCreate,
  contactsHistoryNotificationSet,
} = sliceContactsHistory.actions;

export default sliceContactsHistory.reducer;
