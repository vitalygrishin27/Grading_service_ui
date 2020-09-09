export const ACTION_CHANGE_LOGIN = 'ACTION_CHANGE_LOGIN';
export const ACTION_CHANGE_PASSWORD = 'ACTION_CHANGE_PASSWORD';
export const ACTION_CHANGE_TOKEN = 'ACTION_CHANGE_TOKEN';

export const changeLogin = (newLogin) => {
    return {
        type: ACTION_CHANGE_LOGIN,
        payload: newLogin,
    }
}

export const changePassword = (newPassword) => {
    return {
        type: ACTION_CHANGE_PASSWORD,
        payload: newPassword,
    }
}

export const changeToken = (token) => {
    return {
        type: ACTION_CHANGE_TOKEN,
        payload: token,
    }
}