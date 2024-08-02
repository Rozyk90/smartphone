import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Contact {
  name: string;
  number: string;
  uid: string | null;
  elementId: number;
}

type Actions = "addNew" | "update";

interface ContactsGeneralState {
  newContactData: Contact;
  contactActionType: Actions;
  callingNumber: string;
}

const initialState: ContactsGeneralState = {
  newContactData: { name: "", number: "", uid: "", elementId: 0 },
  contactActionType: "addNew",
  callingNumber: "",
};

export const sliceContactsGeneral = createSlice({
  name: "contactsGeneral",
  initialState,
  reducers: {
    contactNewContactData: (state, action: PayloadAction<Contact>) => {
      state.newContactData = action.payload;
    },
    contactActionTypeSet: (state, action: PayloadAction<Actions>) => {
      state.contactActionType = action.payload;
    },
    contactSetCalling: (state, action) => {
      state.callingNumber = action.payload;
    },
    contactGeneralDefault: (state) => {
      state.newContactData = { name: "", number: "", uid: "", elementId: 0 };
      state.contactActionType = "addNew";
      state.callingNumber = "";
    },
  },
});

export const {
  contactNewContactData,
  contactActionTypeSet,
  contactSetCalling,
  contactGeneralDefault,
} = sliceContactsGeneral.actions;

export default sliceContactsGeneral.reducer;
