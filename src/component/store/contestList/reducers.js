import {
    ACTION_CHANGE_CONTEST_FOR_CHANGE_CATEGORIES, ACTION_CHANGE_CONTEST_ID_FOR_CHANGE_CATEGORIES,
    ACTION_CHANGE_CONTEST_ID_FOR_EDIT,
    ACTION_CHANGE_CONTESTS
} from "./actions";
import {
    ACTION_CHANGE_SHOW_MODAL
} from "../categoryList/actions";

const initialState = {
    contests: [],
    contestIdForEdit: -1,
    contestForChangeCategories: {},
    contestIdForChangeCategories: -1,
}

export const contestListReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_CHANGE_CONTESTS:
            return {...state, contests: action.payload}
        case ACTION_CHANGE_CONTEST_ID_FOR_EDIT:
            return {...state, contestIdForEdit: action.payload}
        case ACTION_CHANGE_CONTEST_ID_FOR_CHANGE_CATEGORIES:
            return {...state, contestIdForChangeCategories: action.payload}
        case ACTION_CHANGE_SHOW_MODAL:
            return {...state, showModal: action.payload}
        case ACTION_CHANGE_CONTEST_FOR_CHANGE_CATEGORIES:
            return {...state, contestForChangeCategories: action.payload}
        default:
            break;
    }
    return state;
}