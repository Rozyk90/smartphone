import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Contact {
  name: string;
  number: string;
  uid: string | null;
  elementId: number;
}

interface ContactsListState {
  contactsList: Contact[];
}

const initialState: ContactsListState = {
  contactsList: [],
};

export const sliceContactsList = createSlice({
  name: "contactsList",
  initialState,
  reducers: {
    contactsListCreate: (state, action: PayloadAction<Contact[]>) => {
      state.contactsList = action.payload;
    },
    contactsListAddNew: (state, action: PayloadAction<Contact>) => {
      console.log("dodajemy nowy kontakt redux");
      state.contactsList.push(action.payload);
    },
    contactsListUpdate: (state, action: PayloadAction<Contact>) => {
      const index = state.contactsList.findIndex((contact) => {
        return contact.elementId === action.payload.elementId;
      });
      if (index !== -1) {
        state.contactsList[index] = action.payload;
        console.log("poprawiamy kontakt");
      }
    },
    contactsListDelete: (state, action: PayloadAction<number>) => {
      state.contactsList = state.contactsList.filter(
        (contact) => contact.elementId !== action.payload
      );
    },
    contactsListDefault: (state) => {
      state.contactsList = [];
    },
  },
});

export const {
  contactsListCreate,
  contactsListUpdate,
  contactsListAddNew,
  contactsListDelete,
  contactsListDefault,
} = sliceContactsList.actions;

export default sliceContactsList.reducer;
