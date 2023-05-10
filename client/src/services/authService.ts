import $api from "./axiosService";
import ILoginData from "../types/ILoginData";
import IUser from "../types/IUser";
import IRegData from "../types/IRegData";

// TODO: make the auth with the jwt tokens
export const authService = {
    async login(loginData : ILoginData)  {
        return await $api.post<IUser>('/login', loginData);
    },

    async registration(regData : IRegData) {
        return await $api.post<IUser>('/registration', regData);
    },

}