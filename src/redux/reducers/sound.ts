import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";




interface sound {

};

const initialState: sound = {

}

export const sliceSound = createSlice({
  name: "sound",
  initialState,
  reducers: {

  },
});

export const {} = sliceSound.actions;

export default sliceSound.reducer;
