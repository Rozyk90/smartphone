import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { enumTheme } from "../../theme/theme";

interface BGprops {
  group: "gradients" | "photos";
  id: number;
}

interface theme {
  darkMode: boolean;
  darkModeAuto: boolean;
  currentTheme: enumTheme;
  background: BGprops;
}

const initialState: theme = {
  darkMode: false,
  darkModeAuto: true,
  currentTheme: enumTheme.themeBasic,
  background: { group: "gradients", id: 0 },
};

export const sliceTheme = createSlice({
  name: "theme",
  initialState,
  reducers: {
    themeDefault: (state) => {
      state.darkMode = false;
      state.darkModeAuto = true;
      state.currentTheme = enumTheme.themeBasic;
      state.background = { group: "gradients", id: 0 };
    },
    setDarkModeOn: (state) => {
      state.darkMode = true;
    },
    setDarkModeOff: (state) => {
      state.darkMode = false;
    },
    setDarkModeAutoOn: (state) => {
      state.darkModeAuto = true;
    },
    setDarkModeAutoOff: (state) => {
      state.darkModeAuto = false;
    },
    setTheme: (state, action: PayloadAction<enumTheme>) => {
      state.currentTheme = action.payload;
    },
    setBg: (state, action: PayloadAction<BGprops>) => {
      state.background = action.payload;
    },
    themeFirestoreUpdate: (state, action) => {
      const { darkMode, darkModeAuto, currentTheme, background } =
        action.payload;
      state.darkMode = darkMode;
      state.darkModeAuto = darkModeAuto;
      state.currentTheme = currentTheme;
      state.background = background;
    },
  },
});

export const {
  themeDefault,
  setDarkModeOn,
  setDarkModeOff,
  setTheme,
  setBg,
  setDarkModeAutoOn,
  setDarkModeAutoOff,
  themeFirestoreUpdate,
} = sliceTheme.actions;

export default sliceTheme.reducer;
