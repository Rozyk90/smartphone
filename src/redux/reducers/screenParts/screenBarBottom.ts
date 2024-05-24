import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { enumCurrentBarBottom, enumCurrentScreen } from "./enumsScreen";

interface State {
  currentBarBottom: enumCurrentBarBottom;
}

const initialState: State = {
  currentBarBottom: enumCurrentBarBottom.off,
};

const screenBarBottomSlice = createSlice({
  name: "screenBarBottomSlice",
  initialState,
  reducers: {
    setCurrentBarBottom: (
      state,
      action: PayloadAction<enumCurrentBarBottom>
    ) => {
      state.currentBarBottom = action.payload;
    },
  },
});

export const { setCurrentBarBottom } = screenBarBottomSlice.actions;
export default screenBarBottomSlice.reducer;
