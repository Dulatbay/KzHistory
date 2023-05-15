import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {setUser} from '../features/userSlice';
import IAuthResponse from "../../types/IAuthResponse";
import IRegData from "../../types/IRegData";
import ILoginData from "../../types/ILoginData";

const BASE_URL = 'http://localhost:8080/api/v1';
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/auth`,
        credentials: "include",
        prepareHeaders: (headers, {getState}) => {
            const token = localStorage.getItem('token')
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        refreshToken: builder.query<IAuthResponse, null>({
            query() {
                return {
                    url: '/refresh-token',
                    method: "POST"
                };
            },
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled;
                    localStorage.setItem('token', data.accessToken)
                    dispatch(setUser(data.user));
                } catch (error) {
                    console.log(error)
                }
            },
        }),
        registerUser: builder.mutation<IAuthResponse, IRegData>({
            query(data) {
                return {
                    url: '/registration',
                    body: data,
                    method: "POST"
                };
            },
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled;
                    localStorage.setItem('token', data.accessToken)
                    dispatch(setUser(data.user))
                } catch (error) {
                    debugger
                }
            },
        }),
        loginUser: builder.mutation<IAuthResponse, ILoginData>({
            query(data) {
                return {
                    url: '/login',
                    body: data,
                    method: "POST",
                };
            },
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled;
                    localStorage.setItem('token', data.accessToken)
                    dispatch(setUser(data.user))
                } catch (error) {
                    debugger
                }
            },
        }),
        logoutUser: builder.mutation<void, void>({
            query() {
                return {
                    url: '/logout',
                    method: "POST",
                    credentials: 'include',
                };
            },
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                try {
                    localStorage.removeItem('token')
                    dispatch(setUser(null))
                } catch (error) {
                    debugger
                }
            },
        }),
    }),
});

export const {
    useRegisterUserMutation,
    useLogoutUserMutation,
    useLoginUserMutation,
    useRefreshTokenQuery
} = authApi