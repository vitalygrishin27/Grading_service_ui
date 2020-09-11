import React, {Component} from "react";
import {Navbar, Nav} from 'react-bootstrap';
import {Link} from "react-router-dom";

export default class NavigationBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: props.token,
            isRegistered: false,
        };
    }

    componentDidMount() {
        if (localStorage.getItem("gradingServiceAccessToken")) {
            this.setState({
                token: this.props.token,
                isRegistered: true,
            })
        }
    }

    clearLocaleStorage = () => {
        localStorage.removeItem("gradingServiceAccessToken");
        localStorage.removeItem("role");
        localStorage.removeItem("login");
        this.setState({
            token: '',
            isRegistered: false,
        });
    }

    render() {
        return (
            <Navbar variant="dark" className={"text-white"} style={{backgroundColor: 'transparent'}}>
                <Link className="navbar-brand" to={"/"}>
                    <img alt="" src="../gradingService.png" width="100px"/>
                </Link>
                <Nav className="mr-auto" style={{"display": localStorage.getItem("gradingServiceAccessToken")
                        && localStorage.getItem("role")
                        && (localStorage.getItem("role")==="ADMINISTRATOR" ||
                        localStorage.getItem("role")==="MANAGER") ? "block" : "none"}}>
                    <Link className="nav-link" to={"/settings"}>
                        Налаштування
                    </Link>
                </Nav>
                <Nav className="mr-auto" style={{"display": localStorage.getItem("gradingServiceAccessToken") ? "block" : "none"}}>
                    <Link className="nav-link" to={"/contests"}>
                        Конкурси
                    </Link>
                </Nav>
                <Nav className="mr-auto" style={{"display": "block"}}>
                    <Link className="nav-link" to={"/users"}>
                        {localStorage.getItem("gradingServiceAccessToken") &&
                        localStorage.getItem("role") &&
                        (localStorage.getItem("role") === 'ADMINISTRATOR' ||
                        localStorage.getItem("role") === 'MANAGER')?'Користувачі':'Учасники'}
                    </Link>
                </Nav>
                <Nav className="mr-auto">
                    {localStorage.getItem("gradingServiceAccessToken") ?
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