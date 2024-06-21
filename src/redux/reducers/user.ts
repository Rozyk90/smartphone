import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface user {
  isLogged: boolean;
  uEmail: string | null;
  uid: string;
  phoneNumber: string;
}

const initialState: user = {
  isLogged: false,
  uEmail: "",
  uid: "",
  phoneNumber: "",
};

export const sliceUser = createSlice({
  name: "user",
  initialState,
  reducers: {
    userSet: (state, action) => {
      state.isLogged = action.payload.isLogged;
      state.uEmail = action.payload.uEmail;
      state.uid = action.payload.uid;
    },
    userLogout: (state) => {
      state.isLogged = false;
      state.uEmail = "";
      state.uid = "";
    },
    userSetNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
  },
});

export const { userSet, userLogout, userSetNumber } = sliceUser.actions;

export default sliceUser.reducer;
