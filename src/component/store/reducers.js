import {combineReducers} from "redux";
import {loggingReducer} from "./logging/reducers";
import {configurationReducer} from "./configuration/reducers";
import {userListReducer} from "./userList/reducers";
import {userReducer} from "./user/reducers";
import {contestListReducer} from "./contestList/reducers";
import {contestReducer} from "./contest/reducers";
import {modalSelectContestReducer} from "./modalSelectContest/reducers";
import {criterionListReducer} from "./criterionList/reducers";
import {performanceListReducer} from "./performanceList/reducers";
import {categoryListReducer} from "./categoryList/reducers";
import {modalSelectCriteriaReducer} from "./modalSelectCriteria/reducers";
import {modalSelectCategoriesReducer} from "./modalSelectCategories/reducers";


export default combineReducers({
    logging: loggingReducer,
    configuration: configurationReducer,
    userList: userListReducer,
    user: userReducer,
    contestList: contestListReducer,
    contest: contestReducer,
    modalSelectContest: modalSelectContestReducer,
    performanceList: performanceListReducer,
    criterionList: criterionListReducer,
    categoryList: categoryListReducer,
    modalSelectCriteria: modalSelectCriteriaReducer,
    modalSelectCategories: modalSelectCategoriesReducer
})