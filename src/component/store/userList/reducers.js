import {
    ACTION_CHANGE_SHOW_MODAL,
    ACTION_CHANGE_USER_FOR_CHANGE_CONTEST,
    ACTION_CHANGE_USER_FOR_EDIT,
    ACTION_CHANGE_USER_ID_FOR_CHANGE_CONTEST,
    ACTION_CHANGE_USERS
} from "./actions";
import {ACTION_CHANGE_USER_ID_FOR_EDIT} from "../user/actions";

const initialState = {
    users: [],
    userIdForEdit: -1,
    userForEdit: {},
    userForChangeContest: {},
    userIdForChangeContest: -1,
}

export const userListReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_CHANGE_USERS:
            return {...state, users: action.payload}
        case ACTION_CHANGE_USER_ID_FOR_EDIT:
            return {...state, userIdForEdit: action.payload}
        case ACTION_CHANGE_USER_ID_FOR_CHANGE_CONTEST:
            return {...state, userIdForChangeContest: action.payload}
        case ACTION_CHANGE_SHOW_MODAL:
            return {...state, showModal: action.payload}
        case ACTION_CHANGE_USER_FOR_CHANGE_CONTEST:
            return {...state, userForChangeContest: action.payload}
        case ACTION_CHANGE_USER_FOR_EDIT:
            return {...state, userForEdit: action.payload}
        default:
            break;
    }
    return state;
}