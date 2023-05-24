import {LoginForm} from "@/features/authentication/Login";
import {useAppSelector} from "@/shared/model";
import {selectIsAuthorized} from "@/entities/session/model/slice";
import {Navigate} from "react-router-dom";

export const LoginPage = () => {
    const isAuthorized = useAppSelector(selectIsAuthorized)

    if(isAuthorized) return <Navigate to="/" />

    return (<LoginForm/>);
};
