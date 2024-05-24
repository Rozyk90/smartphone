import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { enumTheme } from "../../theme/theme";

interface BGprops {
  group: "gradients" | "photos";
  id: number;
}

interface theme {
  darkMode: boolean;
  darkModeAuto: boolean;
  background: BGprops;
  currentTheme: enumTheme;
}

const initialState: theme = {
  darkMode: false,
  darkModeAuto: false,
  background:
  {group:'gradients',id:0},
  currentTheme: enumTheme.themeBasic,
};

export const sliceTheme = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setDarkModeOn: (state) => {
      state.darkMode = true
    },
    setDarkModeOff: (state) => {
      state.darkMode = false
    },
    setDarkModeAutoOn: (state) => {
      state.darkModeAuto = true
    },
    setDarkModeAutoOff: (state) => {
      state.darkModeAuto = false
    },
    setTheme:(state, action: PayloadAction<enumTheme>) =>{
      state.currentTheme = action.payload
    },
    setBg: (state, action: PayloadAction<BGprops>) => {
      state.background = action.payload;
    },
  },
});

export const { setDarkModeOn, setDarkModeOff,setTheme,setBg,setDarkModeAutoOn,setDarkModeAutoOff } = sliceTheme.actions;

export default sliceTheme.reducer;

