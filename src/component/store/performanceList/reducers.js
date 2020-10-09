import {
    ACTION_CHANGE_PERFORMANCES,
    ACTION_CHANGE_PERFORMANCE_FOR_EDIT,
    ACTION_CHANGE_PERFORMANCE_NAME, ACTION_CHANGE_PERFORMANCE_DESCRIPTION
} from "./actions";

const initialState = {
    performances: [],
    performanceForEdit: {},
}

export const performanceListReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_CHANGE_PERFORMANCE_NAME:
            state.performanceForEdit.name=action.payload;
            return {...state}
        case ACTION_CHANGE_PERFORMANCE_DESCRIPTION:
            state.performanceForEdit.description=action.payload;
            return {...state}
        case ACTION_CHANGE_PERFORMANCES:
            return {...state, performances: action.payload}
        case ACTION_CHANGE_PERFORMANCE_FOR_EDIT:
            return {...state, performanceForEdit: action.payload}
        default:
            break;
    }
    return state;
}