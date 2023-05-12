import axios from 'axios'
import {createAsyncThunk} from '@reduxjs/toolkit'
import IRegData from "../../types/IRegData";
import ILoginData from "../../types/ILoginData";

const backendURL = 'http://localhost:8080'

export const registerUser = createAsyncThunk(
    'auth/register',
    async ({email, username, password}: IRegData, {rejectWithValue}) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            await axios.post(
                `${backendURL}/api/user/register`,
                {username, email, password},
                config
            )
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const userLogin = createAsyncThunk(
    'auth/login',
    async ({usernameOrEmail, password}: ILoginData, {rejectWithValue}) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
        }

        const {data} = await axios.post(
            `${backendURL}/api/user/login`,
            {usernameOrEmail, password},
            config
        )

        localStorage.setItem('userToken', data)
    }
)