import { combineReducers } from '@reduxjs/toolkit'
import { baseApi } from '@/shared/api'
import {sessionSlice} from "@/entities/session/model/slice";

export const rootReducer = combineReducers({
  [sessionSlice.name]: sessionSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
})
