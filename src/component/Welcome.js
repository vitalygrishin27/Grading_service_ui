import React, {Component} from "react";
import logo from "../gradingService.png";

export function getOptions()  {
    const token =localStorage.getItem("gradingServiceAccessToken");
    return ({headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'gradingServiceAccessToken': token,
        }})
}


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