import {userActions} from "./reducers/user/userActions";
import {moduleActions} from "./reducers/module/moduleActions";

export const actions = {
    ...userActions,
    ...moduleActions
}