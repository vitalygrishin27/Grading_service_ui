import {
    ACTION_CHANGE_CATEGORIES,
    ACTION_CHANGE_CATEGORY_FOR_EDIT,
    ACTION_CHANGE_CATEGORY_NAME,
    ACTION_CHANGE_CATEGORY_DESCRIPTION,
    ACTION_CHANGE_SHOW_MODAL,
    ACTION_CHANGE_CATEGORY_ID_FOR_CHANGE_CRITERIA,
    ACTION_CHANGE_CATEGORY_FOR_CHANGE_CRITERIA
} from "./actions";

const initialState = {
    categories: [],
    categoryForEdit: {},
    categoryForChangeCriteria: {},
    categopryIdForChangeCriteria: -1,
}

export const categoryListReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_CHANGE_CATEGORY_NAME:
            state.categoryForEdit.name=action.payload;
            return {...state}
        case ACTION_CHANGE_CATEGORY_DESCRIPTION:
            state.categoryForEdit.description=action.payload;
            return {...state}
        case ACTION_CHANGE_CATEGORIES:
            return {...state, categories: action.payload}
        case ACTION_CHANGE_CATEGORY_FOR_EDIT:
            return {...state, categoryForEdit: action.payload}
        case ACTION_CHANGE_CATEGORY_ID_FOR_CHANGE_CRITERIA:
            return {...state, categoryIdForChangeCriteria: action.payload}
        case ACTION_CHANGE_SHOW_MODAL:
            return {...state, showModal: action.payload}
        case ACTION_CHANGE_CATEGORY_FOR_CHANGE_CRITERIA:
            return {...state, categoryForChangeCriteria: action.payload}
        default:
            break;
    }
    return state;
}