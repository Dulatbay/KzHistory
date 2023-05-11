import $api from "./axiosService";

export const topicService = {
    findByNumbers: async (moduleNumber: number, topicNumber: number) => {
        return await $api.get(`/topics/find?topicNumber=${topicNumber}&moduleNumber=${moduleNumber}`)
    }
}