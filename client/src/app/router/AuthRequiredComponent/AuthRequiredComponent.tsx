import React from "react";
import {Navigate} from "react-router-dom";
import {useAppSelector} from "@/shared/model";
import {useMeQuery} from "@/entities/session/api/sessionApi";
import {skipToken} from "@reduxjs/toolkit/query";
import {selectIsAuthorized} from "@/entities/session/model/slice";

export const AuthRequiredComponent = () => {
    const isAuthorized = useAppSelector(selectIsAuthorized)
    const {data: profileData} = useMeQuery(
        isAuthorized ? undefined : skipToken,
        {
            skip: !isAuthorized,
        }
    )

    if (!isAuthorized) {
        return (
            <Navigate to={'/login'}/>
        )
    }
    return (
        <>

        </>
    );
};