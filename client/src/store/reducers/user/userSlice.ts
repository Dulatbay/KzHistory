import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import IUser from "../../../types/IUser";

interface IUserState {
    user: IUser | null
    isLoading: boolean
    isAuth: boolean
    error: string,
}

const initialState: IUserState = {
    isAuth: JSON.parse(localStorage.getItem('isAuth') || 'false'),
    isLoading: false,
    user: JSON.parse(localStorage.getItem('user') || '{}'),
    error: "",
}

export const userSlice = createSlice({
    name: 'userState',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        setIsAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        }
    }
})

export const {
    setUser,
    setIsLoading,
    setIsAuth,
    setError,
} = userSlice.actions

export default userSlice.reducer