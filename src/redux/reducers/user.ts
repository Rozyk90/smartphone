import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface user {
  isLogged: boolean;
  userEmail: string;
  uid: string;
}

const initialState: user = {
  isLogged: false,
  userEmail: "",
  uid: "",
};

export const sliceUser = createSlice({
  name: "user",
  initialState,
  reducers: {
    userSet: (state, action: PayloadAction<user>) => {
      console.log(action);
      state.isLogged = action.payload.isLogged;
      state.userEmail = action.payload.userEmail;
      state.uid = action.payload.uid;
    },
    userLogout: (state) => {
      state.isLogged = false;
      state.userEmail = "";
      state.uid = "";
    },
  },
});

export const { userSet, userLogout } = sliceUser.actions;

export default sliceUser.reducer;
