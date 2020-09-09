export const ACTION_CHANGE_USERS = 'ACTION_CHANGE_USERS';

export const changeUsers = (users) => {
    return {
        type: ACTION_CHANGE_USERS,
        payload: users,
    }
}