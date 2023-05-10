import {authService} from "../../../services/authService";
import {AppDispatch} from "../../store";
import {setError, setIsAuth, setIsLoading, setUser} from "./userSlice";
import ILoginData from "../../../types/ILoginData";
import IRegData from "../../../types/IRegData";
import IUser from "../../../types/IUser";


export const UserActions = {

    login: (loginData: ILoginData) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setIsLoading(true));

            const res = await authService.login(loginData);

            UserActions.saveUser(res.data, dispatch);
        } catch (e: any) {
            dispatch(setError(e.message || 'Login failed'))
            UserActions.clearUser(dispatch);
        } finally {
            dispatch(setIsLoading(true))
        }
    },

    registration: (regData: IRegData) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setIsLoading(true));

            const res = await authService.registration(regData);

            UserActions.saveUser(res.data, dispatch);
        } catch (e: any) {
            dispatch(setError(e.message || 'Reg failed'))
            UserActions.clearUser(dispatch);
        } finally {
            dispatch(setIsLoading(false));
        }
    },

    logout: () => async (dispatch: AppDispatch) => {
        try {
            dispatch(setIsLoading(true));

            UserActions.clearUser(dispatch)
        } catch (e: any) {
            dispatch(setError(e.message))
        } finally {
            dispatch(setIsLoading(false));
        }
    },

    saveUser: (user: IUser, dispatch: AppDispatch) => {
        localStorage.setItem('isAuth', 'true')
        localStorage.setItem('user', JSON.stringify(user))

        dispatch(setIsAuth(true));
        dispatch(setUser(user));
        dispatch(setError(''))
    },

    clearUser: (dispatch: AppDispatch) => {
        localStorage.removeItem('isAuth')
        localStorage.removeItem('user')

        dispatch(setIsAuth(false));
        dispatch(setUser({}));
    }
}
