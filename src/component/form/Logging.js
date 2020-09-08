import React, {Component} from "react";
import {Form, Button} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import axios from 'axios';
import {changeLogin, changePassword} from "../store/actions";
import ToastMessage from "../ToastMessage";

const createUserType = (login, password) => {
    return {
        login: login,
        password: password,
    }
}

class Logging extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            error: false,
            message: '',
        };
    }

    tryToLogIn = event => {
        event.preventDefault();
        const options = {
            headers: {'Content-Type': 'application/json;charset=UTF-8',}
        };

        let user = createUserType(this.props.login, this.props.password);
        axios.put(localStorage.getItem("host") + "user", JSON.stringify(user), options)
            .then(response => {
                if (response.data.login) {
                    this.setState({
                        show: true,
                        error: false,
                        message: 'Ви увійшли до системи з правами: ' + response.data.role
                    });
                    localStorage.setItem("user", response.data.login);
                    localStorage.setItem("role", response.data.role);
                    setTimeout(() => this.setState({"show": false}), 3000);
                    setTimeout(() => document.location.href = "/", 3000);
                }else{
                    this.setState({
                        show: true,
                        error: true,
                        message: 'Логін або пароль невірні'
                    });
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
        const {login, password, changeLogin, changePassword} = this.props;
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
                                onChange={(event) => {
                                    changeLogin(event.target.value)
                                }}
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
                                onChange={(event) => {
                                    changePassword(event.target.value)
                                }}
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

const mapStateToProps = (state) => {
    return {
        login: state.login,
        password: state.password,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeLogin: bindActionCreators(changeLogin, dispatch),
        changePassword: bindActionCreators(changePassword, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logging);



