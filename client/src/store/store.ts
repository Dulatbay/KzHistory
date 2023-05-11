import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/user/userSlice'
import moduleReducer from './reducers/module/moduleSlice'

export const store = configureStore({
    reducer: {
        userState: userReducer,
        moduleState: moduleReducer
    },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch