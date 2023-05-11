import $api from "./axiosService";
import IUser from "../types/IUser";

export const userService = {
    findById: async (id: number | undefined) => {
        return await $api.get<IUser>("/users/" + id);
    }
}