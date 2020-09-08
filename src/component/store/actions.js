import {ACTION_CHANGE_CONTEST_NAME, ACTION_CHANGE_LOGIN, ACTION_CHANGE_PASSWORD} from "../../App";

export const changeContestName = (newContestName) => {
    return {
        type: ACTION_CHANGE_CONTEST_NAME,
        payload: newContestName,
    }
}

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