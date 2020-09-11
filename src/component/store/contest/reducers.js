import {ACTION_CHANGE_CONTEST_NAME, ACTION_CHANGE_CONTEST_PHOTO} from "./actions";

const initialState = {
    name: '',
    photo: '',
}

export const contestReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_CHANGE_CONTEST_NAME:
            return {...state, name: action.payload}
        case ACTION_CHANGE_CONTEST_PHOTO:
            return {...state, photo: action.payload}
        default:
            break;
    }
    return state;
}