export const ACTION_CHANGE_CONTEST_NAME = 'ACTION_CHANGE_CONTEST_NAME';

export const changeContestName = (newContestName) => {
    return {
        type: ACTION_CHANGE_CONTEST_NAME,
        payload: newContestName,
    }
}