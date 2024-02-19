import { configureStore,combineReducers  } from '@reduxjs/toolkit'
// ...

import basicStates from './reducers/basicStates'
import sliceBattery from './reducers/battery'
import sliceScreen from './reducers/screen'
import sliceModal  from './reducers/modal'
import sliceUser  from './reducers/user'

import {topSliceReducer} from './reducers/test';
import {midSliceReducer} from './reducers/test';
import {bottomSliceReducer} from './reducers/test';



const turboSliceReducer = combineReducers({
  top: topSliceReducer,
  mid: midSliceReducer,
  bottom: bottomSliceReducer,
});



export const store = configureStore({
  reducer: {

    turboSliceReducer:turboSliceReducer,


    user:sliceUser,


    basicStates:basicStates,
    battery:sliceBattery,
    screen:sliceScreen,
    modal:sliceModal,
    // posts: postsReducer,
    // comments: commentsReducer,
    // users: usersReducer,
  },
})




// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch




