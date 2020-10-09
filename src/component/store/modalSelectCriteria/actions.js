export const ACTION_CHANGE_CRITERIA = 'ACTION_CHANGE_CRITERIA';
export const ACTION_ADD_CRITERION_TO_LIST = 'ACTION_ADD_CRITERION_TO_LIST';
export const ACTION_REMOVE_CRITERION_FROM_LIST = 'ACTION_REMOVE_CRITERION_FROM_LIST';
export const ACTION_SET_SELECTED_CRITERIA = 'ACTION_SET_SELECTED_CRITERIA';
export const ACTION_SET_ORIGINAL_SELECTED_CRITERIA_IDS = 'ACTION_SET_ORIGINAL_SELECTED_CRITERIA_IDS';

export const changeCriteria = (criteria) => {
    return {
        type: ACTION_CHANGE_CRITERIA,
        payload: criteria,
    }
}

export const setSelectedCriteria = (selectedCriteria) => {
    return {
        type: ACTION_SET_SELECTED_CRITERIA,
        payload: selectedCriteria
    }
}
export const addCriterionToList = (criterion) => {
    return {
        type: ACTION_ADD_CRITERION_TO_LIST,
        payload: criterion
    }
}

export const removeCriterionFromList = (criterion) => {
    return {
        type: ACTION_REMOVE_CRITERION_FROM_LIST,
        payload: criterion
    }
}

export const setOriginalSelectedCriteriaIds = (criteriaIds) => {
    return {
        type: ACTION_SET_ORIGINAL_SELECTED_CRITERIA_IDS,
        payload: criteriaIds
    }
}
