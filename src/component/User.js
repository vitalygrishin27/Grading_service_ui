import React, {Component} from "react";
import {Form, Button, Col, Image} from "react-bootstrap";
import axios from 'axios';
import ToastMessage from "./ToastMessage";
import {getOptions} from "./Welcome";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

const createUserType = (props) => {
    return {
        id: props.userIdForEdit,
        login: props.login,
        password: props.password,
        role: props.role,
        firstName: props.firstName,
        secondName: props.secondName,
        lastName: props.lastName,
        position: props.position,
        photo: props.photo,
    }
}

export default class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            error: false,
            message: '',
        };
        this.changeLogin = this.changeLogin.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changeRole = this.changeRole.bind(this);
        this.changeFirstName = this.changeFirstName.bind(this);
        this.changeSecondName = this.changeSecondName.bind(this);
        this.changeLastName = this.changeLastName.bind(this);
        this.changePosition = this.changePosition.bind(this);
        this.changePhoto = this.changePhoto.bind(this);
        this.changeRoleList = this.changeRoleList.bind(this);
        this.changeUserIdForEdit = this.changeUserIdForEdit.bind(this);
    }

    changeLogin(event) {
        this.props.changeLogin(event.target.value);
    }

    changePassword(event) {
        this.props.changePassword(event.target.value);
    }

    changeRole(event) {
        this.props.changeRole(event.target.value);
    }

    changeFirstName(event) {
        this.props.changeFirstName(event.target.value);
    }

    changeSecondName(event) {
        this.props.changeSecondName(event.target.value);
    }

    changeLastName(event) {
        this.props.changeLastName(event.target.value);
    }

    changePosition(event) {
        this.props.changePosition(event.target.value);
    }

    changePhoto(event) {
        this.props.changePhoto(event.target.value);
    }

    changeRoleList(roleList) {
        this.props.changeRoleList(roleList);
    }

    changeUserIdForEdit(userIdForEdit) {
        this.props.changeUserIdForEdit(userIdForEdit);
    }

    fileChose = event => {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
            console.log(reader.result);

            this.props.changePhoto(reader.result);
        }
        return URL.createObjectURL(event.target.files[0]);

    };

    clearPhoto() {
        this.props.changePhoto('');
        document.getElementById('inputPhoto').value='';
    }

    getRoleList = () => {
        axios.get(localStorage.getItem("host") + "roleList", getOptions())
            .then(response => {
                console.log(response.data);
                this.changeRoleList(response.data);
                if (response.data.length > 0) {
                    this.props.changeRole(response.data[0]);
                }

            })
            .catch((error) => {
                console.error("Error" + error);
                if (error.response && error.response.status === 403) {
                    this.setState({
                        show: true,
                        error: true,
                        message: 'Сесія була закінчена. Авторизуйтесь!'
                    });
                    localStorage.removeItem("gradingServiceAccessToken");
                    setTimeout(() => this.props.history.push('/login'), 3000);
                } else {
                    this.setState({
                        show: true,
                        error: true,
                        message: 'Помилка при завантаженні конфігурації'
                    });
                }
                setTimeout(() => this.setState({"show": false}), 3000);
            });
    }

    saveUser = event => {
        event.preventDefault();
        let user = createUserType(this.props);
        axios.post(localStorage.getItem("host") + "user", JSON.stringify(user), getOptions())
            .then((res) => {
                this.setState({
                    show: true,
                    error: false,
                    message: 'Дані користувача збережено!'
                });
                this.props.changeLogin(null);
                this.props.changePassword(null);
                this.props.changeLastName(null);
                this.props.changeFirstName(null);
                this.props.changeSecondName(null);
                this.props.changePosition(null);
                this.props.changePhoto(null);
                this.props.changeRole(null);
                this.props.changeUserIdForEdit(-1);
                setTimeout(() => this.setState({"show": false}), 3000);
                setTimeout(() => this.props.history.push('/users'), 3000);
            })
            .catch((error) => {
                console.error("Error" + error);
                if (error.response && error.response.status === 403) {
                    this.setState({
                        show: true,
                        error: true,
                        message: 'Сесія була закінчена. Авторизуйтесь!'
                    });
                    localStorage.removeItem("gradingServiceAccessToken");
                    setTimeout(() => this.props.history.push('/login'), 3000);
                } else {
                    this.setState({
                        show: true,
                        error: true,
                        message: 'Помилка при збереженні даних користувача'
                    });
                }
                setTimeout(() => this.setState({"show": false}), 3000);
            });
    }

    componentDidMount() {
        const userIdForEdit = this.props.userIdForEdit;
        this.getRoleList();
        if (userIdForEdit !== -1) {
            this.findUserById(userIdForEdit);
        }
    }

    findUserById = (userId) => {
        axios.get(localStorage.getItem("host") + "user/" + userId, getOptions())
            .then(response => {
                console.log(response.data.login);
                this.props.changeLogin(response.data.login);
                this.props.changePassword(response.data.password);
                this.props.changeLastName(response.data.lastName);
                this.props.changeFirstName(response.data.firstName);
                this.props.changeSecondName(response.data.secondName);
                this.props.changePosition(response.data.position);
                this.props.changePhoto(response.data.photo);
                this.props.changeRole(response.data.role);
            })
            .catch((error) => {
                console.error("Error" + error);
                if (error.response && error.response.status === 403) {
                    this.setState({
                        show: true,
                        error: true,
                        message: 'Сесія була закінчена. Авторизуйтесь!'
                    });
                    localStorage.removeItem("gradingServiceAccessToken");
                    setTimeout(() => this.props.history.push('/login'), 3000);
                } else {
                    this.setState({
                        show: true,
                        error: true,
                        message: 'Помилка при завантаженні даних користувача'
                    });
                }
                setTimeout(() => this.setState({"show": false}), 3000);
            });
    }


    render() {
        const {
            login,
            password,
            role,
            firstName,
            secondName,
            lastName,
            position,
            photo,
            roleList,
        } = this.props;
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
                <Form className={"text-white text-muted"} onSubmit={this.saveUser}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label column lg={2}>Логін</Form.Label>
                            <Form.Control
                                type="text"
                                className="mx-sm-3"
                                value={login}
                                onChange={this.changeLogin}
                                id="inputLogin"
                                aria-describedby="inputLoginHelpInline"
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label column lg={2}>Пароль</Form.Label>
                            <Form.Control
                                type="password"
                                className="mx-sm-3"
                                value={password}
                                onChange={this.changePassword}
                                id="inputPassword"
                                aria-describedby="inputPasswordHelpInline"
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label column lg={2} htmlFor="inputLastName">Прізвище</Form.Label>
                            <Form.Control
                                type="text"
                                className="mx-sm-3"
                                value={lastName}
                                onChange={this.changeLastName}
                                id="inputLastName"
                                aria-describedby="inputLastNameHelpInline"
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label column lg={2} htmlFor="inputFirstName">Ім’я</Form.Label>
                            <Form.Control
                                type="text"
                                className="mx-sm-3"
                                value={firstName}
                                onChange={this.changeFirstName}
                                id="inputFirstName"
                                aria-describedby="inputFirstNameHelpInline"
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label style={{"white-space": "nowrap"}} column lg={2} htmlFor="inputSecondName">По
                                батькові</Form.Label>
                            <Form.Control
                                type="text"
                                className="mx-sm-3"
                                value={secondName}
                                onChange={this.changeSecondName}
                                id="inputSecondName"
                                aria-describedby="inputSecondNameHelpInline"
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label column lg={2} htmlFor="inputPosition">Посада</Form.Label>
                            <Form.Control
                                type="text"
                                className="mx-sm-3"
                                value={position}
                                onChange={this.changePosition}
                                id="inputPosition"
                                aria-describedby="inputPositionHelpInline"
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label style={{"white-space": "nowrap"}} column lg={2} htmlFor="inputRole">Рівень
                                доступу</Form.Label>
                            <Form.Control
                                as="select"
                                className="mx-sm-3"
                                value={role}
                                onChange={this.changeRole}
                                id="inputRole"
                                aria-describedby="inputRoleHelpInline"
                            >
                                {roleList.map((role, count) => (
                                    <option value={role}>
                                        {role}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label column lg={2} htmlFor="inputPhoto">Фото</Form.Label>
                            <Form.Control
                                type="file"
                                className="mx-sm-3"
                                //value={photo}
                                onChange={this.fileChose}
                                id="inputPhoto"
                                aria-describedby="inputPhotoHelpInline"
                            />
                        </Form.Group>

                        <Image style={{"display": this.props.photo ? "inline-block" : "none"}}
                               src={this.props.photo} rounded width={"50"}
                               height={"71"}/> &nbsp;&nbsp;
                        <Button size={"sm"}
                                variant={"outline-danger"}
                                style={{"display": this.props.photo ? "inline-block" : "none", "height":"30px"}}
                                onClick={this.clearPhoto.bind(this)}
                        >
                            <FontAwesomeIcon icon={faTrash}/>
                        </Button>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Button type="submit">Зберегти</Button>
                        </Form.Group>
                    </Form.Row>
                </Form>
            </div>
        );
    }
}



