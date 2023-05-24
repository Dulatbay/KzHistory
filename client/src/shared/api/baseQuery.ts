import {BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta} from "@reduxjs/toolkit/query";
import {fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {apiUrl} from "../lib/config";

export const baseQuery: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError,
    {},
    FetchBaseQueryMeta
> = fetchBaseQuery({
    baseUrl: apiUrl,
    credentials: "include",
    prepareHeaders: (headers, {getState}) => {
        const {accessToken} = (getState() as RootState).session

        if (accessToken) {
            headers.set('Authorization', `Bearer ${accessToken}`)
            headers.set("Content-Type", "application/json");
        }


        return headers;
    },
})