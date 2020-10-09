export const ACTION_CHANGE_CRITERIA = 'ACTION_CHANGE_CRITERIA';
export const ACTION_CHANGE_CRITERION_FOR_EDIT ='ACTION_CHANGE_CRITERION_FOR_EDIT';
export const ACTION_CHANGE_CRITERION_NAME = 'ACTION_CHANGE_CRITERION_NAME';
export const ACTION_CHANGE_CRITERION_DESCRIPTION = 'ACTION_CHANGE_CRITERION_DESCRIPTION';

export const changeCriterionName = (newCriterionName) => {
    return {
        type: ACTION_CHANGE_CRITERION_NAME,
        payload: newCriterionName,
    }
}

export const changeCriterionDescription = (newCriterionDescription) => {
    return {
        type: ACTION_CHANGE_CRITERION_DESCRIPTION,
        payload: newCriterionDescription,
    }
}

export const changeCriteria = (criteria) => {
    return {
        type: ACTION_CHANGE_CRITERIA,
        payload: criteria,
    }
}
export const changeCriterionForEdit = (criterionForEdit) => {
    return {
        type: ACTION_CHANGE_CRITERION_FOR_EDIT,
        payload: criterionForEdit,
    }
}