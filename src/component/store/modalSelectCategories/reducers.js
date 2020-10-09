import {
    ACTION_ADD_CATEGORY_TO_LIST,
    ACTION_CHANGE_CATEGORIES,
    ACTION_REMOVE_CATEGORY_FROM_LIST,
    ACTION_SET_ORIGINAL_SELECTED_CATEGORIES_IDS,
    ACTION_SET_SELECTED_CATEGORIES
} from "./actions";

const initialState = {
    categories: [],
    selectedCategoriesIds: [],
    selectedCategories: [],
    originalSelectedCategoriesIds: [],
}

export const modalSelectCategoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_CHANGE_CATEGORIES:
            return {...state, categories: action.payload}
        case ACTION_ADD_CATEGORY_TO_LIST:
            state.selectedCategories.push(action.payload);
            state.selectedCategoriesIds.push(action.payload.id)
            return {...state}
        case ACTION_REMOVE_CATEGORY_FROM_LIST:
            let index = state.selectedCategories.indexOf(action.payload);
            if (index > -1) {
                state.selectedCategories.splice(index, 1);
            }
            let idIndex = state.selectedCategoriesIds.indexOf(action.payload.id);
            if (index > -1) {
                state.selectedCategoriesIds.splice(idIndex, 1);
            }
            return {...state}
        case ACTION_SET_SELECTED_CATEGORIES:
            if (action.payload.length > 0) {
                action.payload.forEach(category => {
                    state.selectedCategories.push(category);
                    state.selectedCategoriesIds.push(category.id);
                })
            } else {
                state.selectedCategoriesIds = [];
                state.selectedCategories = [];
            }
            return {...state}
        case ACTION_SET_ORIGINAL_SELECTED_CATEGORIES_IDS:
            return {...state, originalSelectedCategoriesIds: action.payload}
        default:
            break;
    }
    return state;
}