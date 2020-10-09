import {ACTION_CHANGE_CATEGORY_FOR_CHANGE_CRITERIA, ACTION_CHANGE_CATEGORY_FOR_EDIT} from "../categoryList/actions";

export const ACTION_CHANGE_CONTESTS = 'ACTION_CHANGE_CONTESTS';
export const ACTION_CHANGE_CONTEST_ID_FOR_EDIT ='ACTION_CHANGE_CONTEST_ID_FOR_EDIT';
export const ACTION_CHANGE_CONTEST_FOR_EDIT ='ACTION_CHANGE_CONTEST_FOR_EDIT';
export const ACTION_CHANGE_CONTEST_FOR_CHANGE_CATEGORIES ='ACTION_CHANGE_CONTEST_FOR_CHANGE_CATEGORIES';
export const ACTION_CHANGE_CONTEST_ID_FOR_CHANGE_CATEGORIES = 'ACTION_CHANGE_CONTEST_ID_FOR_CHANGE_CATEGORIES';
export const ACTION_CHANGE_SHOW_MODAL = 'ACTION_CHANGE_SHOW_MODAL';


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
export const changeContestForEdit = (contestForEdit) => {
    return {
        type: ACTION_CHANGE_CONTEST_FOR_EDIT,
        payload: contestForEdit,
    }
}
export const changeContestForChangeCategories = (contest) => {
    return {
        type: ACTION_CHANGE_CONTEST_FOR_CHANGE_CATEGORIES,
        payload: contest,
    }
}
export const changeContestIdForChangeCategories = (contestIdForChangeCategories) => {
    return {
        type: ACTION_CHANGE_CONTEST_ID_FOR_CHANGE_CATEGORIES,
        payload: contestIdForChangeCategories,
    }
}
export const changeShowModal = (isNeedToShow) => {
    return {
        type: ACTION_CHANGE_SHOW_MODAL,
        payload: isNeedToShow,
    }
}

export const changeCategoryForChangeCriteria = (category) => {
    return {
        type: ACTION_CHANGE_CATEGORY_FOR_CHANGE_CRITERIA,
        payload: category,
    }
}