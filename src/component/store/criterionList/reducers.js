import {
    ACTION_CHANGE_CRITERIA,
    ACTION_CHANGE_CRITERION_FOR_EDIT,
    ACTION_CHANGE_CRITERION_NAME,
    ACTION_CHANGE_CRITERION_DESCRIPTION
} from "./actions";

const initialState = {
    criteria: [],
    criterionForEdit: {},
}

export const criterionListReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_CHANGE_CRITERION_NAME:
            state.criterionForEdit.name=action.payload;
            return {...state}
        case ACTION_CHANGE_CRITERION_DESCRIPTION:
            state.criterionForEdit.description=action.payload;
            return {...state}
        case ACTION_CHANGE_CRITERIA:
            return {...state, criteria: action.payload}
        case ACTION_CHANGE_CRITERION_FOR_EDIT:
            return {...state, criterionForEdit: action.payload}
        default:
            break;
    }
    return state;
}