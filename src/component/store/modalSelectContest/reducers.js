import {
    ACTION_ADD_CONTEST_TO_LIST,
    ACTION_CHANGE_CONTESTS,
    ACTION_REMOVE_CONTEST_FROM_LIST,
    ACTION_SET_ORIGINAL_SELECTED_CONTEST_IDS,
    ACTION_SET_SELECTED_CONTESTS
} from "./actions";

const initialState = {
    contests: [],
    selectedContestIds: [],
    selectedContests: [],
    originalSelectedContestIds: [],
}

export const modalSelectContestReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_CHANGE_CONTESTS:
            return {...state, contests: action.payload}
        case ACTION_ADD_CONTEST_TO_LIST:
            state.selectedContests.push(action.payload);
            state.selectedContestIds.push(action.payload.id)
            return {...state}
        case ACTION_REMOVE_CONTEST_FROM_LIST:
            let index = state.selectedContests.indexOf(action.payload);
            if (index > -1) {
                state.selectedContests.splice(index, 1);
            }
            let idIndex = state.selectedContestIds.indexOf(action.payload.id);
            if (index > -1) {
                state.selectedContestIds.splice(idIndex, 1);
            }
            return {...state}
        case ACTION_SET_SELECTED_CONTESTS:
            if (action.payload.length > 0) {
                action.payload.forEach(contest => {
                    state.selectedContests.push(contest);
                    state.selectedContestIds.push(contest.id);
                })
            } else {
                state.selectedContestIds = [];
                state.selectedContests = [];
            }
            return {...state}
        case ACTION_SET_ORIGINAL_SELECTED_CONTEST_IDS:
            return {...state, originalSelectedContestIds: action.payload}
        default:
            break;
    }
    return state;
}