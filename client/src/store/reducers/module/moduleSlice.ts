import IModule from "../../../types/IModule";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IModuleInitialState {
    currentModule: IModule | null,
    currentTopicNumber: number | null,
    isLoading: boolean,
    error: string
}

const initialState: IModuleInitialState = {
    currentModule: null,
    currentTopicNumber: null,
    isLoading: false,
    error: ""
}

export const moduleSlice = createSlice({
    name: "moduleState",
    initialState,
    reducers: {
        setCurrentModule: (state, action: PayloadAction<IModule | null>) => {
            state.currentModule = action.payload;
        },
        setCurrentTopicNumber: (state, action: PayloadAction<number | null>) => {
            state.currentTopicNumber = action.payload;
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        }
    }
})


export const {
    setCurrentModule,
    setCurrentTopicNumber,
    setError,
    setIsLoading
} = moduleSlice.actions

export default moduleSlice.reducer