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
    enumIcons.clock,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.appShop,
    enumIcons.gameMemory,
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
    enumIcons.contacts,
    enumIcons.sms,
    enumIcons.settings,
    enumIcons.calculator,
  ],
};

const screenCenterSlice = createSlice({
  name: "screenCenterSlice",
  initialState,
  reducers: {
    setCurrentScreen: (state, action: PayloadAction<enumCurrentScreen>) => {
      state.currentScreen = action.payload;
    },
    updateScreenGrid: (state, action: PayloadAction<Array<enumIcons>>) => {
      state.screenGrid = action.payload;
    },
    screenGridAddIcon: (state, action: PayloadAction<enumIcons>) => {
      const newIcon = action.payload;
      const emptyIndex = state.screenGrid.indexOf(enumIcons.empty);

      if (emptyIndex !== -1) {
        state.screenGrid[emptyIndex] = newIcon;
      }
    },
    screenGridDelIcon: (state, action: PayloadAction<enumIcons>) => {
      const delIcon = action.payload;
      const delIndex = state.screenGrid.indexOf(delIcon);

      if (delIndex !== -1) {
        state.screenGrid[delIndex] = enumIcons.empty;
      }
    },
  },
});

export const { setCurrentScreen, updateScreenGrid, screenGridAddIcon,screenGridDelIcon } =
  screenCenterSlice.actions;
export default screenCenterSlice.reducer;
