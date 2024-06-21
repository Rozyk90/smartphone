import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Contact {
  name: string | null;
  number: string | null;
}

interface ContactsState {
  contactToEdit: Contact;
}

const initialState: ContactsState = {
  contactToEdit: { name: null, number: null },
};

export const sliceContacts = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setContactToEdit: (state, action: PayloadAction<Contact>) => {
      state.contactToEdit = action.payload;
    },
  },
});

export const {setContactToEdit} = sliceContacts.actions;

export default sliceContacts.reducer;
