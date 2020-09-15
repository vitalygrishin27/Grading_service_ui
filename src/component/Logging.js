import React, {Component} from "react";
import {Form, Button, Col} from "react-bootstrap";
import axios from 'axios';
import ToastMessage from "./ToastMessage";
import {getEndpoint, getOptions, USERS_MAIN_ENDPOINT} from "./Welcome";

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
        this.changeToken = this.changeToken.bind(this);
    }

    changeLogin(event) {
        this.props.changeLogin(event.target.value);
    }

    changePassword(event) {
        this.props.changePassword(event.target.value);
    }

    changeToken(token) {
        this.props.changeToken(token);
    }

    tryToLogIn = event => {
        event.preventDefault();

        let user = createUserType(this.props.login, this.props.password);
        axios.put(getEndpoint(USERS_MAIN_ENDPOINT), JSON.stringify(user), getOptions())
            .then(response => {
                if (response.data.token) {
                    this.setState({
                        show: true,
                        error: false,
                        message: 'Ви увійшли до системи'
                    });
                    console.log(response.data);
                    localStorage.setItem("gradingServiceAccessToken", response.data.token);
                    localStorage.setItem("role", response.data.role);
                    localStorage.setItem("login", response.data.login);
                    this.changeToken(response.data.token);
                    setTimeout(() => this.setState({"show": false}), 1000);
                    setTimeout(() => this.props.history.push('/'), 1000);
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

    createNewUser() {
        this.props.changeUserIdForEdit(-1);
        this.props.history.push('/user/-1');
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
                <Form className={"text-white text-muted"} onSubmit={this.tryToLogIn}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label column lg={2} htmlFor="inputLogin">Логін</Form.Label>
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
                        <Form.Group as={Col}>
                            <Form.Label column lg={2} htmlFor="inputPassword">Пароль</Form.Label>
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
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Button type="submit">Увійти</Button>&nbsp;&nbsp;
                            <Button variant={"outline-warning"}
                                    onClick={this.createNewUser.bind(this)}>Зареєструватися</Button>
                        </Form.Group>
                    </Form.Row>
                </Form>
            </div>
        );
    }
}



