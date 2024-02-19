import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Enum do określenia stanów
// export enum EnumState {
//   top = 'top',
//   mid = 'mid',
//   bottom = 'bottom',
// }

// Interfejs opisujący stan
interface State {
  isActive: boolean;
}

// Początkowy stan dla każdego slice'a
const initialState: State = {
  isActive: false,
};

// Tworzymy osobne slicey dla każdego stanu
const topSlice = createSlice({
  name: "topSlice",
  initialState,
  reducers: {
    // Akcje i reduktory dla topSlice
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
    // Akcje i reduktory dla midSlice
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
    // Akcje i reduktory dla bottomSlice
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