import {baseApi, SESSION_TAG} from "@/shared/api";
import {type Session} from '../model/types'
import {RequestLoginBody, RequestRegistrationBody, SessionDto} from "./types";
import {mapSession} from "../lib/mapSession";
import IUser from "@/shared/types/IUser";

const url = '/auth'

export const sessionApi = baseApi.injectEndpoints({
    endpoints: build => ({
        login: build.mutation<Session, RequestLoginBody>({
            query: (body) => ({
                url: `${url}/login`,
                method: "POST",
                body
            }),
            invalidatesTags: [SESSION_TAG],
            transformResponse: (response: SessionDto) => mapSession(response),
        }),
        registration: build.mutation<Session, RequestRegistrationBody>({
            query: (body) => ({
                url: `${url}/registration`,
                method: "POST",
                body
            }),
            invalidatesTags: [SESSION_TAG],
            transformResponse: (response: SessionDto) => mapSession(response)
        }),
        me: build.query<IUser, void>({
            query: () => ({
                url: `${url}/me`,
            }),
            providesTags: [SESSION_TAG],
        }),
    }),
})

export const {useLoginMutation, useMeQuery} = sessionApi
