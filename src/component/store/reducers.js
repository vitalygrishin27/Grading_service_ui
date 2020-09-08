import {combineReducers} from "redux";
import {loggingReducer} from "./logging/reducers";
import {configurationReducer} from "./configuration/reducers";


export default combineReducers({
    logging: loggingReducer,
    configuration: configurationReducer,
})