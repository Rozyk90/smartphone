import { createSlice, PayloadAction } from "@reduxjs/toolkit";

enum enumTheme {
  themeBasic = "basicTheme",
  themeBlackWhite = 'blackWhite'
}



interface theme {
  darkMode: boolean;
  background: string;
  currentTheme: enumTheme;
}

const initialState: theme = {
  darkMode: false,
  background:
    "radial-gradient(circle, rgba(127,142,170,1) 19%, rgba(53,104,150,1) 61%)",
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
    }
  },
});

export const { setDarkModeOn, setDarkModeOff,setTheme } = sliceTheme.actions;

export default sliceTheme.reducer;

