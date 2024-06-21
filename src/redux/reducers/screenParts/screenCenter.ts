import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { enumIcons } from "../../../components/icons/enumsIcon";
import { enumCurrentScreen } from "./enumsScreen";

interface State {
  currentScreen: enumCurrentScreen;
  screenGrid: Array<enumIcons>;
}

const initialState: State = {
  currentScreen: enumCurrentScreen.screenNone,
  screenGrid: [
    enumIcons.appShop,
    enumIcons.calendar,
    enumIcons.clock,
    enumIcons.settings,
    enumIcons.contacts,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
  ],
};

const screenCenterSlice = createSlice({
  name: "screenCenterSlice",
  initialState,
  reducers: {
    updateScreenGrid: (state, action: PayloadAction<Array<enumIcons>>) => {
      state.screenGrid = action.payload;
    },
    setCurrentScreen: (state, action: PayloadAction<enumCurrentScreen>) => {
      state.currentScreen = action.payload;
    },
  },
});


export const { updateScreenGrid,setCurrentScreen } = screenCenterSlice.actions;
export default screenCenterSlice.reducer;
