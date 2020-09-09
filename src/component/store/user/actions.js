export const ACTION_CHANGE_ROLELIST = 'ACTION_CHANGE_ROLELIST';
export const ACTION_CHANGE_LOGIN = 'ACTION_CHANGE_LOGIN';
export const ACTION_CHANGE_PASSWORD = 'ACTION_CHANGE_PASSWORD';
export const ACTION_CHANGE_LASTNAME = 'ACTION_CHANGE_LASTNAME';
export const ACTION_CHANGE_FIRSTNAME = 'ACTION_CHANGE_FIRSTNAME';
export const ACTION_CHANGE_SECONDNAME = 'ACTION_CHANGE_SECONDNAME';
export const ACTION_CHANGE_POSITION = 'ACTION_CHANGE_POSITION';
export const ACTION_CHANGE_ROLE = 'ACTION_CHANGE_ROLE';
export const ACTION_CHANGE_PHOTO = 'ACTION_CHANGE_PHOTO';
export const ACTION_CHANGE_USER_ID_FOR_EDIT = 'ACTION_CHANGE_USER_ID_FOR_EDIT';

export const changeRoleList = (roleList) => {
    return {
        type: ACTION_CHANGE_ROLELIST,
        payload: roleList,
    }
}

export const changeLogin = (login) => {
    return {
        type: ACTION_CHANGE_LOGIN,
        payload: login,
    }
}

export const changePassword = (password) => {
    return {
        type: ACTION_CHANGE_PASSWORD,
        payload: password,
    }
}

export const changeLastName = (lastName) => {
    return {
        type: ACTION_CHANGE_LASTNAME,
        payload: lastName,
    }
}

export const changeFirstName = (firstName) => {
    return {
        type: ACTION_CHANGE_FIRSTNAME,
        payload: firstName,
    }
}

export const changeSecondName = (secondName) => {
    return {
        type: ACTION_CHANGE_SECONDNAME,
        payload: secondName,
    }
}

export const changeRole = (role) => {
    return {
        type: ACTION_CHANGE_ROLE,
        payload: role,
    }
}

export const changePosition = (position) => {
    return {
        type: ACTION_CHANGE_POSITION,
        payload: position,
    }
}

export const changePhoto = (photo) => {
    return {
        type: ACTION_CHANGE_PHOTO,
        payload: photo,
    }
}

export const changeUserIdForEdit = (userIdForEdit) => {
    return {
        type: ACTION_CHANGE_USER_ID_FOR_EDIT,
        payload: userIdForEdit,
    }
}