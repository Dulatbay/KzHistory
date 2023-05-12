import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const REGISTER_USER_PENDING = 'auth/registerUser/pending';
const REGISTER_USER_FULFILLED = 'auth/registerUser/fulfilled';
const REGISTER_USER_REJECTED = 'auth/registerUser/rejected';

const initialState = {
    loading: false,
    userInfo: {}, // for user object
    userToken: null, // for storing the JWT
    error: null,
    success: false, // for monitoring the registration process.
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: {
        [REGISTER_USER_PENDING]: (state) => {
            state.loading = false
            state.error = null
        },
        [REGISTER_USER_FULFILLED]: (state) => {
            state.loading = false
            state.success = true
        },
        [REGISTER_USER_REJECTED]: (state, {payload}: any) => {
            state.loading = false
            state.error = payload
        },

    },
})


export default authSlice.reducer