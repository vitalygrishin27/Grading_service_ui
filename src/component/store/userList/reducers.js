import {ACTION_CHANGE_USERS} from "./actions";
import {ACTION_CHANGE_USER_ID_FOR_EDIT} from "../user/actions";

const initialState = {
    users: [],
    userIdForEdit: -1,
}

export const userListReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_CHANGE_USERS:
            return {...state, users: action.payload}
        case ACTION_CHANGE_USER_ID_FOR_EDIT:
            return {...state, userIdForEdit: action.payload}
        default:
            break;
    }
    return state;
}