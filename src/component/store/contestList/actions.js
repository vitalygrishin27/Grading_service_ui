export const ACTION_CHANGE_CONTESTS = 'ACTION_CHANGE_CONTESTS';
export const ACTION_CHANGE_CONTEST_ID_FOR_EDIT ='ACTION_CHANGE_CONTEST_ID_FOR_EDIT';

export const changeContests = (contests) => {
    return {
        type: ACTION_CHANGE_CONTESTS,
        payload: contests,
    }
}
export const changeContestIdForEdit = (contestIdForEdit) => {
    return {
        type: ACTION_CHANGE_CONTEST_ID_FOR_EDIT,
        payload: contestIdForEdit,
    }
}