export const ACTION_CHANGE_CATEGORIES = 'ACTION_CHANGE_CATEGORIES';
export const ACTION_ADD_CATEGORY_TO_LIST = 'ACTION_ADD_CATEGORY_TO_LIST';
export const ACTION_REMOVE_CATEGORY_FROM_LIST = 'ACTION_REMOVE_CATEGORY_FROM_LIST';
export const ACTION_SET_SELECTED_CATEGORIES = 'ACTION_SET_SELECTED_CATEGORIES';
export const ACTION_SET_ORIGINAL_SELECTED_CATEGORIES_IDS = 'ACTION_SET_ORIGINAL_SELECTED_CATEGORIES_IDS';

export const changeCategories = (categories) => {
    return {
        type: ACTION_CHANGE_CATEGORIES,
        payload: categories,
    }
}

export const setSelectedCategories = (selectedCategories) => {
    return {
        type: ACTION_SET_SELECTED_CATEGORIES,
        payload: selectedCategories
    }
}
export const addCategoryToList = (category) => {
    return {
        type: ACTION_ADD_CATEGORY_TO_LIST,
        payload: category
    }
}

export const removeCategoryFromList = (category) => {
    return {
        type: ACTION_REMOVE_CATEGORY_FROM_LIST,
        payload: category
    }
}

export const setOriginalSelectedCategoriesIds = (categoriesIds) => {
    return {
        type: ACTION_SET_ORIGINAL_SELECTED_CATEGORIES_IDS,
        payload: categoriesIds
    }
}
