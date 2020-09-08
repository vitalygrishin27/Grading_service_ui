import React, {Component} from "react";
import {Navbar, Nav} from 'react-bootstrap';
import {Link} from "react-router-dom";

export default class NavigationBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isRegistered: false,
        };
    }

    componentDidMount() {
        if (localStorage.getItem("gradingServiceAccessToken")) {
            this.setState({
                isRegistered: true,
            })
        }
    }

    clearLocaleStorage = () => {
        localStorage.removeItem("gradingServiceAccessToken");
        this.setState({
            isRegistered: false,
        });
      //  document.location.href = "/";
    }

    render() {
        const {isRegistered} = this.state;
        return (
            <Navbar variant="dark" className={"text-white"} style={{backgroundColor: 'transparent'}}>
                <Link className="navbar-brand" to={"/"}>
                    <img alt="" src="../gradingService.png" width="100px"/>
                </Link>
                <Nav className="mr-auto" style={{"display": isRegistered ? "block" : "none"}}>
                    <Link className="nav-link" to={"/settings"}>
                        Налаштування
                    </Link>
                </Nav>
                <Nav className="mr-auto">
                    {isRegistered ?
                        <Link style={{"cursor": "pointer"}} className="nav-link" to={"/"}
                              onClick={this.clearLocaleStorage.bind()}>
                            Вийти
                        </Link> :
                        <Link className="nav-link" to={"/login"}>
                            Увійти до системи
                        </Link>}
                </Nav>
            </Navbar>
        );
    }
}