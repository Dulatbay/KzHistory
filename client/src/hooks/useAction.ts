import {actions} from "../store/actions";
import {bindActionCreators} from "@reduxjs/toolkit";
import {useAppDispatch} from "../store/hooks";

export const useAction = () =>{
    const dispatch = useAppDispatch();
    return bindActionCreators(actions, dispatch)
}