import { configureStore, combineReducers } from "@reduxjs/toolkit";
// ...

import basicStates from "./reducers/basicStates";
import sliceBattery from "./reducers/battery";
import sliceModal from "./reducers/modal";
import sliceUser from "./reducers/user";
import sliceTheme from "./reducers/theme";
import sliceSound from "./reducers/sound/general";

import screenBarBottom from "./reducers/screenParts/screenBarBottom";
import screenBarTop from "./reducers/screenParts/screenBarTop";
import screenCenter from "./reducers/screenParts/screenCenter";
import screenGeneral from "./reducers/screenParts/screenGeneral";

import sliceSoundGeneral from "./reducers/sound/general";
import sliceSoundSounds from "./reducers/sound/sounds";
import sliceSoundVibrations from "./reducers/sound/vibrations";


const screen = combineReducers({
  barTop: screenBarTop,
  center: screenCenter,
  barBottom: screenBarBottom,
  general: screenGeneral,
});
const sound = combineReducers({
  vibration: sliceSoundVibrations,
  sounds: sliceSoundSounds,
  general: sliceSoundGeneral,
});

export const store = configureStore({
  reducer: {

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
