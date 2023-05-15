import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import IUser from "../../types/IUser";

interface IUserState {
    user: IUser | null
}

const initialState: IUserState = {
    user: null
}

export const userSlice = createSlice({
    initialState,
    name: 'userSlice',
    reducers: {
        logout: () => initialState,
        setUser: (state, action: PayloadAction<IUser | null>) => {
            state.user = action.payload
        }
    }
})

export default userSlice.reducer

export const {setUser, logout} = userSlice.actions