import React, {Component} from "react";
import logo from "../gradingService.png";

export function getOptions() {
    const token = localStorage.getItem("gradingServiceAccessToken");
    return ({
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'gradingServiceAccessToken': token,
        }
    })
}

export function getEndpoint(type) {
    const host = localStorage.getItem("host");
    switch (type) {
        case CONFIGURATIONS_MAIN_ENDPOINT:
            return host + "configurations";
        case USERS_ROLE_LIST_GET_ENDPOINT:
            return host + "users/roleList";
        case USERS_MAIN_ENDPOINT:
            return host + "users";
        case CONTESTS_MAIN_ENDPOINT:
            return host + "contests";
        default:
            return null;
    }
}

export const CONFIGURATIONS_MAIN_ENDPOINT = 'CONFIGURATIONS_MAIN_ENDPOINT';
export const USERS_ROLE_LIST_GET_ENDPOINT = 'USERS_ROLE_LIST_GET_ENDPOINT';
export const USERS_MAIN_ENDPOINT = 'USERS_MAIN_ENDPOINT';
export const CONTESTS_MAIN_ENDPOINT = 'CONTESTS_MAIN_ENDPOINT';

export default class Welcome extends Component {


    componentDidMount() {
        localStorage.setItem("host", "http://localhost:8095/")
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                </header>
            </div>
        );
    }
}