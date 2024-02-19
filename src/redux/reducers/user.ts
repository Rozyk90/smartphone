import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum enumUser {

}



interface user {
    isLogged:boolean,
    userEmail:string,
    uid:string
};

const initialState: user = {
    isLogged:false,
    userEmail:'',
    uid: ''
}

export const sliceUser = createSlice({
  name: "user",
  initialState,
  reducers: {

    setUser: (state, action: PayloadAction<user>) => {
        console.log(action)
        state.isLogged = action.payload.isLogged
        state.userEmail = action.payload.userEmail
        state.uid = action.payload.uid
    }
  },
});

export const {setUser} = sliceUser.actions;

export default sliceUser.reducer;
