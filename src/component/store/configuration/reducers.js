import {ACTION_CHANGE_CONTEST_NAME} from "./actions";

const initialState = {
    contestName: '',
}

export const configurationReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_CHANGE_CONTEST_NAME:
            return {...state, contestName: action.payload}
        default:
            break;
    }
    return state;
}