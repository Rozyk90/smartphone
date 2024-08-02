import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { enumIcons } from "../../components/icons/enumsIcon";

export enum enumCategories {
  Basic = "Basic",
  Utilities = "Utilities",
  Games = "Games",
}

interface App {
  title: enumIcons;
  category: enumCategories;
  core: boolean;
}

interface state {
  appsList: App[];
  openCategory: enumCategories | "";
}

const initialState: state = {
  openCategory: enumCategories.Utilities,
  appsList: [
    { title: enumIcons.settings, category: enumCategories.Basic, core: true },
    { title: enumIcons.appShop, category: enumCategories.Basic, core: true },
    { title: enumIcons.clock, category: enumCategories.Utilities, core: false },
    {
      title: enumIcons.calendar,
      category: enumCategories.Utilities,
      core: false,
    },
    { title: enumIcons.contacts, category: enumCategories.Basic, core: true },
    { title: enumIcons.sms, category: enumCategories.Basic, core: true },
    {
      title: enumIcons.calculator,
      category: enumCategories.Utilities,
      core: false,
    },
    {
      title: enumIcons.gameMemory,
      category: enumCategories.Games,
      core: false,
    },
  ],
};

export const sliceApps = createSlice({
  name: "apps",
  initialState,
  reducers: {
    setOpenCategory: (state, action: PayloadAction<enumCategories>) => {
      state.openCategory = action.payload;
    },
  },
});

export const { setOpenCategory } = sliceApps.actions;

export default sliceApps.reducer;
