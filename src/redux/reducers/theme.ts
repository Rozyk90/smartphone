import { createSlice, PayloadAction } from "@reduxjs/toolkit";

enum enumTheme {
  themeBasic = "basicTheme",
  themeBlackWhite = 'blackWhite'
}

interface BGprops {
  group: "gradients" | "photos";
  id: number;
}

interface theme {
  darkMode: boolean;
  background: BGprops;
  currentTheme: enumTheme;
}

const initialState: theme = {
  darkMode: false,
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
    setTheme:(state) =>{
      state.currentTheme = enumTheme.themeBlackWhite
    },
    setBg: (state, action: PayloadAction<BGprops>) => {
      state.background = action.payload;
    },
  },
});

export const { setDarkModeOn, setDarkModeOff,setTheme,setBg } = sliceTheme.actions;

export default sliceTheme.reducer;

