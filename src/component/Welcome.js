import React, {Component} from "react";
import logo from "../gradingService.png";

export default class Welcome extends Component {

    componentDidMount() {
        //  localStorage.setItem("host", "https://derff.herokuapp.com/ui/")
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