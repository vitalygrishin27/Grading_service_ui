export const ACTION_CHANGE_CONTESTS = 'ACTION_CHANGE_CONTESTS';
export const ACTION_ADD_CONTEST_TO_LIST = 'ACTION_ADD_CONTEST_TO_LIST';
export const ACTION_REMOVE_CONTEST_FROM_LIST = 'ACTION_REMOVE_CONTEST_FROM_LIST';
export const ACTION_SET_SELECTED_CONTESTS = 'ACTION_SET_SELECTED_CONTESTS';
export const ACTION_SET_ORIGINAL_SELECTED_CONTEST_IDS = 'ACTION_SET_ORIGINAL_SELECTED_CONTEST_IDS';

export const changeContests = (contests) => {
    return {
        type: ACTION_CHANGE_CONTESTS,
        payload: contests,
    }
}

export const setSelectedContests = (selectedContests) => {
    return {
        type: ACTION_SET_SELECTED_CONTESTS,
        payload: selectedContests
    }
}
export const addContestToList = (contest) => {
    return {
        type: ACTION_ADD_CONTEST_TO_LIST,
        payload: contest
    }
}

export const removeContestFromList = (contest) => {
    return {
        type: ACTION_REMOVE_CONTEST_FROM_LIST,
        payload: contest
    }
}

export const setOriginalSelectedContestIds = (contestIds) => {
    return {
        type: ACTION_SET_ORIGINAL_SELECTED_CONTEST_IDS,
        payload: contestIds
    }
}
