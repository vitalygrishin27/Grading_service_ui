export const ACTION_CHANGE_CATEGORIES = 'ACTION_CHANGE_CATEGORIES';
export const ACTION_CHANGE_CATEGORY_FOR_EDIT ='ACTION_CHANGE_CATEGORY_FOR_EDIT';
export const ACTION_CHANGE_CATEGORY_NAME = 'ACTION_CHANGE_CATEGORY_NAME';
export const ACTION_CHANGE_CATEGORY_DESCRIPTION = 'ACTION_CHANGE_CATEGORY_DESCRIPTION';

export const ACTION_CHANGE_CATEGORY_ID_FOR_CHANGE_CRITERIA = 'ACTION_CHANGE_CATEGORY_ID_FOR_CHANGE_CRITERIA';
export const ACTION_CHANGE_SHOW_MODAL = 'ACTION_CHANGE_SHOW_MODAL';
export const ACTION_CHANGE_CATEGORY_FOR_CHANGE_CRITERIA = 'ACTION_CHANGE_CATEGORY_FOR_CHANGE_CRITERIA';


export const changeCategoryName = (newCategoryName) => {
    return {
        type: ACTION_CHANGE_CATEGORY_NAME,
        payload: newCategoryName,
    }
}

export const changeCategoryDescription = (newCategoryDescription) => {
    return {
        type: ACTION_CHANGE_CATEGORY_DESCRIPTION,
        payload: newCategoryDescription,
    }
}

export const changeCategories = (categories) => {
    return {
        type: ACTION_CHANGE_CATEGORIES,
        payload: categories,
    }
}
export const changeCategoryForEdit = (categoryForEdit) => {
    return {
        type: ACTION_CHANGE_CATEGORY_FOR_EDIT,
        payload: categoryForEdit,
    }
}

export const changeCategoryIdForChangeCriteria = (categoryIdForChangeCriteria) => {
    return {
        type: ACTION_CHANGE_CATEGORY_ID_FOR_CHANGE_CRITERIA,
        payload: categoryIdForChangeCriteria,
    }
}

export const changeShowModal = (isNeedToShow) => {
    return {
        type: ACTION_CHANGE_SHOW_MODAL,
        payload: isNeedToShow,
    }
}

export const changeCategoryForChangeCriteria = (category) => {
    return {
        type: ACTION_CHANGE_CATEGORY_FOR_CHANGE_CRITERIA,
        payload: category,
    }
}
