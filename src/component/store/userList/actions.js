import {ACTION_CHANGE_USER_ID_FOR_EDIT} from "../user/actions";

export const ACTION_CHANGE_USERS = 'ACTION_CHANGE_USERS';

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