import {combineReducers} from "redux";
import {loggingReducer} from "./logging/reducers";
import {configurationReducer} from "./configuration/reducers";
import {userListReducer} from "./userList/reducers";
import {userReducer} from "./user/reducers";


export default combineReducers({
    logging: loggingReducer,
    configuration: configurationReducer,
    userList: userListReducer,
    user: userReducer,
})