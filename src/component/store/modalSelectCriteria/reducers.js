import {
    ACTION_ADD_CRITERION_TO_LIST,
    ACTION_CHANGE_CRITERIA,
    ACTION_REMOVE_CRITERION_FROM_LIST,
    ACTION_SET_ORIGINAL_SELECTED_CRITERIA_IDS,
    ACTION_SET_SELECTED_CRITERIA
} from "./actions";

const initialState = {
    criteria: [],
    selectedCriteriaIds: [],
    selectedCriteria: [],
    originalSelectedCriteriaIds: [],
}

export const modalSelectCriteriaReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_CHANGE_CRITERIA:
            return {...state, criteria: action.payload}
        case ACTION_ADD_CRITERION_TO_LIST:
            state.selectedCriteria.push(action.payload);
            state.selectedCriteriaIds.push(action.payload.id)
            return {...state}
        case ACTION_REMOVE_CRITERION_FROM_LIST:
            let index = state.selectedCriteria.indexOf(action.payload);
            if (index > -1) {
                state.selectedCriteria.splice(index, 1);
            }
            let idIndex = state.selectedCriteriaIds.indexOf(action.payload.id);
            if (index > -1) {
                state.selectedCriteriaIds.splice(idIndex, 1);
            }
            return {...state}
        case ACTION_SET_SELECTED_CRITERIA:
            if (action.payload.length > 0) {
                action.payload.forEach(criteria => {
                    state.selectedCriteria.push(criteria);
                    state.selectedCriteriaIds.push(criteria.id);
                })
            } else {
                state.selectedCriteriaIds = [];
                state.selectedCriteria = [];
            }
            return {...state}
        case ACTION_SET_ORIGINAL_SELECTED_CRITERIA_IDS:
            return {...state, originalSelectedCriteriaIds: action.payload}
        default:
            break;
    }
    return state;
}