import {combineReducers} from "redux";
import {loggingReducer} from "./logging/reducers";
import {configurationReducer} from "./configuration/reducers";
import {userListReducer} from "./userList/reducers";


export default combineReducers({
    logging: loggingReducer,
    configuration: configurationReducer,
    userList: userListReducer,
})