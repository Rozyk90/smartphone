import { configureStore, combineReducers } from "@reduxjs/toolkit";
// ...

import basicStates from "./reducers/basicStates";
import sliceBattery from "./reducers/battery";
import sliceModal from "./reducers/modal";
import sliceUser from "./reducers/user";
import sliceTheme from "./reducers/theme";
import  sliceSms  from "./reducers/sms";

import  slicePageStates  from "./reducers/pageStates";
import  sliceContactsHistory from "./reducers/contacts/contactsHistory";
import  sliceContactsList  from "./reducers/contacts/contactsList";
import  sliceContactsGeneral  from "./reducers/contacts/contactsGeneral";

import screenBarBottom from "./reducers/screenParts/screenBarBottom";
import screenBarTop from "./reducers/screenParts/screenBarTop";
import screenCenter from "./reducers/screenParts/screenCenter";
import screenGeneral from "./reducers/screenParts/screenGeneral";

import sliceSoundGeneral from "./reducers/sound/general";
import sliceSystemSounds from "./reducers/sound/systemSounds";
import sliceSystemVibrations from "./reducers/sound/systemVibrations";


const screen = combineReducers({
  barTop: screenBarTop,
  center: screenCenter,
  barBottom: screenBarBottom,
  general: screenGeneral,
});
const sound = combineReducers({
  systemVibration: sliceSystemVibrations,
  systemSounds: sliceSystemSounds,
  general: sliceSoundGeneral,
});
const contacts = combineReducers({
  history:sliceContactsHistory,
  list:sliceContactsList,
  general:sliceContactsGeneral,
});

export const store = configureStore({
  reducer: {
    pageStates: slicePageStates,
    contacts:contacts,
    sms:sliceSms,
    user: sliceUser,
    theme: sliceTheme,

    basicStates: basicStates,
    battery: sliceBattery,
    screen: screen,
    sound: sound,
    modal: sliceModal,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
