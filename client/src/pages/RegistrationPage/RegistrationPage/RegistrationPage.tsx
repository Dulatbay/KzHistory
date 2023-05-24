import {RegistrationForm} from "@/features/authentication/Registration";
import {useAppSelector} from "@/shared/model";
import {selectIsAuthorized} from "@/entities/session/model/slice";
import {Navigate} from "react-router-dom";

export const RegistrationPage = () => {
    const isAuthorized = useAppSelector(selectIsAuthorized)
    if(isAuthorized) return <Navigate to="/" />

    return (<RegistrationForm/>);
};
