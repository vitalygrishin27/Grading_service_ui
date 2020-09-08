import React, {Component} from "react";
import {Form, Button} from "react-bootstrap";
import {store} from "../App";
import axios from 'axios';
import ToastMessage from "./ToastMessage";
import {options} from "./Welcome";

const createUserType = (login, password) => {
    return {
        login: login,
        password: password,
    }
}

export default class Logging extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            error: false,
            message: '',
        };
        this.changeLogin = this.changeLogin.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }

    changeLogin(event) {
        this.props.changeLogin(event.target.value);
    }

    changePassword(event) {
        this.props.changePassword(event.target.value);
    }

    tryToLogIn = event => {
        event.preventDefault();

        let user = createUserType(this.props.login, this.props.password);
        axios.put(localStorage.getItem("host") + "user", JSON.stringify(user), options)
            .then(response => {
                if (response.data.token) {
                    this.setState({
                        show: true,
                        error: false,
                        message: 'Ви увійшли до системи'
                    });
                    localStorage.setItem("gradingServiceAccessToken", response.data.token);
                    setTimeout(() => this.setState({"show": false}), 3000);
                    setTimeout(() => document.location.href = "/", 3000);
                } else {
                    this.setState({
                        show: true,
                        error: true,
                        message: 'Логін або пароль невірні'
                    });
                    localStorage.removeItem("gradingServiceAccessToken");
                    setTimeout(() => this.setState({"show": false}), 3000);
                }
            })
            .catch((error) => {
                console.error("Error" + error);
                this.setState({
                    show: true,
                    error: true,
                    message: 'Помилка. ' + error
                });
                setTimeout(() => this.setState({"show": false, "error": false}), 3000);
            });
    }

    render() {
        const {login, password} = this.props;
        const {show, error, message} = this.state;
        return (
            <div>
                <div style={{"display": show ? "block" : "none"}}>
                    <ToastMessage
                        show={show}
                        error={error}
                        message={message}
                    />
                </div>
                <Form inline className={"text-white text-muted"} onSubmit={this.tryToLogIn}>
                    <Form.Row>
                        <Form.Group>
                            <Form.Label htmlFor="inputLogin">Логін</Form.Label>
                            <Form.Control
                                type="text"
                                className="mx-sm-3"
                                value={login}
                                autoComplete="off"
                                onChange={this.changeLogin}
                                id="inputLogin"
                                aria-describedby="inputLoginHelpInline"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="inputPassword">Пароль</Form.Label>
                            <Form.Control
                                type="password"
                                className="mx-sm-3"
                                value={password}
                                autoComplete="off"
                                onChange={this.changePassword}
                                id="inputPassword"
                                aria-describedby="inputPasswordHelpInline"
                            />
                        </Form.Group>
                        <Button type="submit">Увійти</Button>
                    </Form.Row>
                </Form>
            </div>
        );
    }
}



