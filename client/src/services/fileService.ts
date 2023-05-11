import $api, {BASE_URL} from "./axiosService";

export const fileService = {
    getFileName: (filename: string) => {
        if(filename == "") return "";
        return BASE_URL + "static/" + filename
    },

    uploadUserImage: async (formData : FormData) => {
      return await $api.patch("/users/edit-image", formData);
    }
}