import $api from "./axiosService";
import IModule from "../types/IModule";

export const moduleService = {
    findAll: async () => {
        return await $api.get<IModule[]>(`/modules`)
    },

    findById: async (moduleId: number) => {
        if(!moduleId) return;
        return await $api.get<IModule>(`/modules/${moduleId}`)
    }
}