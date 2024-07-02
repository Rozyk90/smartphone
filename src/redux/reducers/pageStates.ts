import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface pageStates {
  doFirstUpdate: boolean;
  wasInteraction: boolean;
}

const initialState: pageStates = {
  doFirstUpdate: true,
  wasInteraction: false,
};

export const slicePageStates = createSlice({
  name: "pageStates",
  initialState,
  reducers: {
    pageFirstUpdateDone: (state) => {
      state.doFirstUpdate = false;
    },
    pageFirstInteraction: (state) => {
      state.wasInteraction = true;
    },
  },
});

export const { pageFirstUpdateDone,pageFirstInteraction } = slicePageStates.actions;

export default slicePageStates.reducer;
