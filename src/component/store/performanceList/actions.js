export const ACTION_CHANGE_PERFORMANCES = 'ACTION_CHANGE_PERFORMANCES';
export const ACTION_CHANGE_PERFORMANCE_FOR_EDIT ='ACTION_CHANGE_PERFORMANCE_FOR_EDIT';
export const ACTION_CHANGE_PERFORMANCE_NAME = 'ACTION_CHANGE_PERFORMANCE_NAME';
export const ACTION_CHANGE_PERFORMANCE_DESCRIPTION = 'ACTION_CHANGE_PERFORMANCE_DESCRIPTION';

export const changePerformanceName = (newPerformanceName) => {
    return {
        type: ACTION_CHANGE_PERFORMANCE_NAME,
        payload: newPerformanceName,
    }
}

export const changePerformanceDescription = (newPerformanceDescription) => {
    return {
        type: ACTION_CHANGE_PERFORMANCE_DESCRIPTION,
        payload: newPerformanceDescription,
    }
}

export const changePerformances = (performances) => {
    return {
        type: ACTION_CHANGE_PERFORMANCES,
        payload: performances,
    }
}
export const changePerformanceForEdit = (performanceForEdit) => {
    return {
        type: ACTION_CHANGE_PERFORMANCE_FOR_EDIT,
        payload: performanceForEdit,
    }
}