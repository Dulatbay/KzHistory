import IModule from "../../../types/IModule";
import {AppDispatch} from "../../store";
import {setCurrentModule, setCurrentTopicNumber, setIsLoading} from "./moduleSlice";
import {setError} from "../user/userSlice";
import {moduleService} from "../../../services/moduleService";

export const moduleActions = {
    changeTopic: (topicNumber: number | null) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setIsLoading(true));
            dispatch(setCurrentTopicNumber(topicNumber));

            localStorage.setItem('currentTopicNumber', JSON.stringify(topicNumber))
        } catch (e: any) {
            dispatch(setError(e.message + ' - changeTopic failed'))
            dispatch(setCurrentTopicNumber(null));
            dispatch(setCurrentModule(null));
            localStorage.removeItem('currentTopicNumber')
            localStorage.removeItem('currentModuleId')
        } finally {
            dispatch(setIsLoading(false));
        }
    },
    initModule: () => async (dispatch: AppDispatch) => {
        try {
            dispatch(setIsLoading(true));

            const currentModuleId = parseInt(localStorage.getItem('currentModuleId') || "0")
            const response = await moduleService.findById(currentModuleId);
            if(!response) return;

            if (response.status !== 200) throw new Error("Module not found");

            dispatch(setCurrentModule(response.data));
            localStorage.setItem('currentModuleId', JSON.stringify(response.data.id))
        } catch (e: any) {
            dispatch(setError(e.message + ' - initModule failed'))
            dispatch(setCurrentTopicNumber(null));
            dispatch(setCurrentModule(null));
            localStorage.removeItem('currentTopicNumber')
            localStorage.removeItem('currentModuleId')
        } finally {
            dispatch(setIsLoading(false));
        }
    },
    changeModule: (module: IModule) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setIsLoading(true));
            dispatch(setCurrentModule(module));

            localStorage.setItem('currentModuleId', JSON.stringify(module.id))
        } catch (e: any) {
            dispatch(setError(e.message + ' - changeModule failed'))
            dispatch(setCurrentTopicNumber(null));
            dispatch(setCurrentModule(null));
            localStorage.removeItem('currentTopicNumber')
            localStorage.removeItem('currentModuleId')
        } finally {
            dispatch(setIsLoading(false));
        }
    }
}