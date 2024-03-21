import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { enumCurrentBarTop } from "./enumsScreen";

interface State {
  currentBarTop: enumCurrentBarTop;
}

const initialState: State = {
  currentBarTop: enumCurrentBarTop.off,
};

const screenBarTopSlice = createSlice({
  name: "screenBarTopSlice",
  initialState,
  reducers: {
    setCurrenBarTop: (state, action: PayloadAction<enumCurrentBarTop>) => {
      state.currentBarTop = action.payload;
    },
  },
});

export const { setCurrenBarTop } = screenBarTopSlice.actions;
export default screenBarTopSlice.reducer;
