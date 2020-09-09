import {ACTION_CHANGE_LOGIN, ACTION_CHANGE_PASSWORD, ACTION_CHANGE_TOKEN} from "./actions";


const initialState = {
    login: '',
    password: '',
    token:'',
}

export const loggingReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_CHANGE_LOGIN:
            return {...state, login: action.payload}
        case ACTION_CHANGE_PASSWORD:
            return {...state, password: action.payload}
        case ACTION_CHANGE_TOKEN:
            return {...state, token: action.payload}
        default:
            break;
    }
    return state;
}