import {
    ACTION_CHANGE_FIRSTNAME,
    ACTION_CHANGE_LASTNAME, ACTION_CHANGE_PHOTO, ACTION_CHANGE_POSITION, ACTION_CHANGE_ROLE,
    ACTION_CHANGE_ROLELIST,
    ACTION_CHANGE_SECONDNAME, ACTION_CHANGE_USER_ID_FOR_EDIT
} from "./actions";
import {ACTION_CHANGE_LOGIN, ACTION_CHANGE_PASSWORD} from "../logging/actions";

const initialState = {
    roleList: [],
    login: '',
    password: '',
    role: '',
    firstName: '',
    secondName: '',
    lastName: '',
    position: '',
    photo: '',
    userIdForEdit:-1,
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_CHANGE_ROLELIST:
            return {...state, roleList: action.payload}
        case ACTION_CHANGE_LOGIN:
            return {...state, login: action.payload}
        case ACTION_CHANGE_PASSWORD:
            return {...state, password: action.payload}
        case ACTION_CHANGE_LASTNAME:
            return {...state, lastName: action.payload}
        case ACTION_CHANGE_FIRSTNAME:
            return {...state, firstName: action.payload}
        case ACTION_CHANGE_SECONDNAME:
            return {...state, secondName: action.payload}
        case ACTION_CHANGE_POSITION:
            return {...state, position: action.payload}
        case ACTION_CHANGE_PHOTO:
            return {...state, photo: action.payload}
        case ACTION_CHANGE_ROLE:
            return {...state, role: action.payload}
        case ACTION_CHANGE_USER_ID_FOR_EDIT:
            return {...state, userIdForEdit: action.payload}
        default:
            break;
    }
    return state;
}