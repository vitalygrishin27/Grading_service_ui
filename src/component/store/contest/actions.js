export const ACTION_CHANGE_CONTEST_NAME = 'ACTION_CHANGE_CONTEST_NAME';
export const ACTION_CHANGE_CONTEST_PHOTO = 'ACTION_CHANGE_CONTEST_PHOTO';

export const changeName = (newContestName) => {
    return {
        type: ACTION_CHANGE_CONTEST_NAME,
        payload: newContestName,
    }
}

export const changePhoto = (newContestPhoto) => {
    return {
        type: ACTION_CHANGE_CONTEST_PHOTO,
        payload: newContestPhoto,
    }
}