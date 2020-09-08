import {ACTION_CHANGE_CONTEST_NAME, ACTION_CHANGE_LOGIN, ACTION_CHANGE_PASSWORD} from "../../App";

const initialState = {
    contestName: '',
    login: '',
    password: '',
}

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_CHANGE_CONTEST_NAME:
            return {...state, contestName: action.payload}
        case ACTION_CHANGE_LOGIN:
            return {...state, login: action.payload}
        case ACTION_CHANGE_PASSWORD:
            return {...state, password: action.payload}
        default:
            break;
    }
    return state;
}