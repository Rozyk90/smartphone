import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface State {
  isActive: boolean;
}


const initialState: State = {
  isActive: false,
};

const topSlice = createSlice({
  name: "topSlice",
  initialState,
  reducers: {
    turnOnTop: (state) => {
      state.isActive = true;
    },
    turnOffTop: (state) => {
      state.isActive = false;
    },
  },
});

const midSlice = createSlice({
  name: "midSlice",
  initialState,
  reducers: {

    turnOnMid: (state) => {
      state.isActive = true;
    },
    turnOffMid: (state) => {
      state.isActive = false;
    },
  },
});

const bottomSlice = createSlice({
  name: "bottomSlice",
  initialState,
  reducers: {
    turnOnBottom: (state) => {
      state.isActive = true;
    },
    turnOffBottom: (state) => {
      state.isActive = false;
    },
  },
});

// Eksportujemy akcje i reduktory z każdego slice'a
export const {
  turnOnTop,
  turnOffTop,
} = topSlice.actions;

export const {
  turnOnMid,
  turnOffMid,
} = midSlice.actions;

export const {
  turnOnBottom,
  turnOffBottom,
} = bottomSlice.actions;

// Eksportujemy reduktory z każdego slice'a
export const topSliceReducer = topSlice.reducer;
export const midSliceReducer = midSlice.reducer;
export const bottomSliceReducer = bottomSlice.reducer;