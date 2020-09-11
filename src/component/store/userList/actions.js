import {ACTION_CHANGE_USER_ID_FOR_EDIT} from "../user/actions";

export const ACTION_CHANGE_USERS = 'ACTION_CHANGE_USERS';
export const ACTION_CHANGE_USER_ID_FOR_CHANGE_CONTEST = 'ACTION_CHANGE_USER_ID_FOR_CHANGE_CONTEST';
export const ACTION_CHANGE_SHOW_MODAL = 'ACTION_CHANGE_SHOW_MODAL';
export const ACTION_CHANGE_USER_FOR_CHANGE_CONTEST = 'ACTION_CHANGE_USER_FOR_CHANGE_CONTEST';

export const changeUsers = (users) => {
    return {
        type: ACTION_CHANGE_USERS,
        payload: users,
    }
}

export const changeUserIdForEdit = (userIdForEdit) => {
    return {
        type: ACTION_CHANGE_USER_ID_FOR_EDIT,
        payload: userIdForEdit,
    }
}

export const changeUserIdForChangeContest = (userIdForChangeContest) => {
    return {
        type: ACTION_CHANGE_USER_ID_FOR_CHANGE_CONTEST,
        payload: userIdForChangeContest,
    }
}

export const changeShowModal = (isNeedToShow) => {
    return {
        type: ACTION_CHANGE_SHOW_MODAL,
        payload: isNeedToShow,
    }
}

export const changeUserForChangeContest = (user) => {
    return {
        type: ACTION_CHANGE_USER_FOR_CHANGE_CONTEST,
        payload: user,
    }
}