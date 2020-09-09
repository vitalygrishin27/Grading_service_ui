import {ACTION_CHANGE_USERS} from "./actions";

const initialState = {
    users: [],
}

export const userListReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_CHANGE_USERS:
            return {...state, users: action.payload}
        default:
            break;
    }
    return state;
}