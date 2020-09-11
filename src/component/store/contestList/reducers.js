import {ACTION_CHANGE_CONTEST_ID_FOR_EDIT, ACTION_CHANGE_CONTESTS} from "./actions";

const initialState = {
    contests: [],
    contestIdForEdit: -1,
}

export const contestListReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_CHANGE_CONTESTS:
            return {...state, contests: action.payload}
        case ACTION_CHANGE_CONTEST_ID_FOR_EDIT:
            return {...state, contestIdForEdit: action.payload}
        default:
            break;
    }
    return state;
}